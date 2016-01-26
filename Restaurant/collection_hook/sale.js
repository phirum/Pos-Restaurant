Restaurant.Collection.SaleDetails.before.insert(function (user, doc) {
    doc._id = idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, doc.saleId, 3);
});

Restaurant.Collection.SaleDetails.after.remove(function (userId, doc) {
    var sale = Restaurant.Collection.Sales.findOne(doc.saleId);
    if (sale != null) {
        updateSaleTotal(doc.saleId);
        // removePromotionProduct(doc);
    }

});

Restaurant.Collection.SaleDetails.after.insert(function (userId, doc) {
    updateSaleTotal(doc.saleId);
    /* Meteor.defer(function () {
     var sale = Restaurant.Collection.Sales.findOne(doc.saleId);
     var saleDate = sale.saleDate;
     checkPromotion(doc, saleDate);
     });*/
});

Restaurant.Collection.SaleDetails.after.update(function (userId, doc, fieldNames, modifier, options) {
    updateSaleTotal(doc.saleId);
    /* Meteor.defer(function () {
     var sale = Restaurant.Collection.Sales.findOne(doc.saleId);
     var saleDate = sale.saleDate;
     checkPromotion(doc, saleDate);
     });*/
});

Restaurant.Collection.Sales.after.update(function (userId, doc, fieldNames, modifier, options) {
    updateSaleTotal(doc._id);
    /* Meteor.defer(function () {
     var saleDetails = Restaurant.Collection.SaleDetails.find({saleId: doc._id});
     saleDetails.forEach(function (saleDetail) {
     checkPromotion(saleDetail, doc.saleDate);
     })
     });*/

});
Restaurant.Collection.Sales.after.remove(function (userId, doc) {
    Restaurant.Collection.SaleDetails.remove({saleId: doc._id});
    //Restaurant.Collection.SaleDetails.direct.remove({saleId: doc._id});
});

function updateSaleTotal(saleId) {
    Meteor.defer(function () {
        Meteor._sleepForMs(1000);
        var set = {};
        //var discount = Restaurant.Collection.Sales.findOne(saleId).discountAmount;
        var sale = Restaurant.Collection.Sales.findOne(saleId);
        var discount = sale && sale.discount ? sale.discount : 0;
        var saleSubTotal = 0;
        var saleDetails = Restaurant.Collection.SaleDetails.find({saleId: saleId});
        saleDetails.forEach(function (saleDetail) {
            saleSubTotal += parseFloat(saleDetail.amount);
        });
        /*var saleDate = sale.saleDate;
         var saleTime = moment(saleDate).format("HH:mm");
         var selector = {};
         selector.startDate = {$lte: saleDate};
         selector.endDate = {$gte: saleDate};
         selector.startTime = {$lte: saleTime};
         selector.endTime = {$gte: saleTime};
         var promotionTotalAmounts = Restaurant.Collection.PromotionTotalAmounts.findOne(selector);
         var promotionPercentage = Restaurant.Collection.PromotionPercentages.findOne(selector);
         if (promotionTotalAmounts != null) {
         var arr = sortArrayByKey(promotionTotalAmounts.promotionItems, "amount");
         arr.forEach(function (item) {
         if (saleSubTotal >= item.amount) {
         discount = item.discount;
         }
         });
         set.discount = discount;
         } else if (promotionPercentage != null) {
         set.discount = discount = promotionPercentage.percentage;
         } else {
         set.discount = discount = 0;
         }
         */

        var baseCurrencyId = Cpanel.Collection.Setting.findOne().baseCurrency;
        //var total = saleSubTotal - discount;
        var total = saleSubTotal * (1 - discount / 100);
        if (baseCurrencyId == "KHR") {
            total = roundRielCurrency(total);
        }
        // var discountAmount = saleSubTotal * discount / 100;

        set.subTotal = saleSubTotal;
        set.total = total;
        // set.discountAmount = discountAmount;
        set.owedAmount = total;
        //set.discountAmount=saleSubTotal-total;
        Restaurant.Collection.Sales.direct.update(saleId, {$set: set});
        //Meteor.call('updateSale', saleId, set);
    });
}

function sortArrayByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


function removePromotionProduct(doc) {
    Meteor.defer(function () {
        if (!doc.isPromotion) {
            var sale = Restaurant.Collection.Sales.findOne(doc.saleId);
            var saleDate = sale.saleDate;
            //var today = moment().toDate();
            var saleTime = moment(saleDate).format("HH:mm");
            var selector = {};
            selector.productId = doc.productId;
            selector.startDate = {$lte: saleDate};
            selector.endDate = {$gte: saleDate};
            selector.startTime = {$lte: saleTime};
            selector.endTime = {$gte: saleTime};
            var promotionQty = Restaurant.Collection.PromotionQuantities.findOne(selector);
            if (promotionQty != null) {
                promotionQty.promotionItems.forEach(function (pro) {
                    var selector = {
                        promotionFromProductId: doc.productId,
                        productId: pro.productId,
                        saleId: doc.saleId,
                        isPromotion: true
                    };
                    var productPromotion = Restaurant.Collection.SaleDetails.findOne(selector);
                    if (productPromotion != null) {
                        Restaurant.Collection.SaleDetails.direct.remove(productPromotion._id);
                    }
                });
            }
        }
    });
}
function checkPromotion(saleDetail, saleDate) {
    var data = {
        message: []
    };
    if (!saleDetail.isPromotion) {
        //var today = moment().toDate();
        var saleTime = moment(saleDate).format("HH:mm");
        var selector = {};
        selector.productId = saleDetail.productId;
        selector.startDate = {$lte: saleDate};
        selector.endDate = {$gte: saleDate};
        selector.startTime = {$lte: saleTime};
        selector.endTime = {$gte: saleTime};
        var promotionQty = Restaurant.Collection.PromotionQuantities.findOne(selector);
        if (promotionQty != null) {
            var increase = parseInt(saleDetail.quantity / promotionQty.quantity);
            if (increase > 0) {
                promotionQty.promotionItems.forEach(function (pro) {
                    //check the promotion item quantity in stock is enough
                    var inventoryType = 1;
                    var inventory;
                    if (inventoryType == 1) {
                        inventory = Restaurant.Collection.FIFOInventory.findOne({
                            branchId: saleDetail.branchId,
                            productId: pro.productId
                        }, {sort: {createdAt: -1}});
                    }
                    var promotionQuantity = 0;
                    if (inventory.quantity <= 0) {
                        data.message.push('Promotion Item is out of stock.' + pro.productId);
                        return;
                    }
                    if (inventory.quantity < increase * pro.quantity) {
                        data.message.push('Promotion Item is not enough.');
                        promotionQuantity = inventory.quantity;
                    } else {
                        promotionQuantity = increase * pro.quantity;
                    }

                    var selector = {
                        promotionFromProductId: saleDetail.productId,
                        productId: pro.productId,
                        saleId: saleDetail.saleId,
                        isPromotion: true
                    };
                    var productPromotion = Restaurant.Collection.SaleDetails.findOne(selector);
                    var saleDetailObj = {};
                    if (productPromotion == null) {
                        saleDetailObj._id = idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, saleDetail.saleId, 3);
                        saleDetailObj.productId = pro.productId;
                        saleDetailObj.quantity = promotionQuantity;
                        saleDetailObj.discount = 0;
                        saleDetailObj.locationId = saleDetail.locationId;
                        //saleDetailObj.discount = 100;
                        saleDetailObj.price = 0;
                        //saleDetailObj.price = isRetail ? product.retailPrice : product.wholesalePrice;
                        saleDetailObj.amount = 0;
                        saleDetailObj.branchId = saleDetail.branchId;
                        saleDetailObj.saleId = saleDetail.saleId;
                        saleDetailObj.isPromotion = true;
                        saleDetailObj.promotionFromProductId = saleDetail.productId;
                        Restaurant.Collection.SaleDetails.insert(saleDetailObj);
                    } else {
                        saleDetailObj.quantity = promotionQuantity;
                        saleDetailObj.discount = 0;
                        saleDetailObj.price = 0;
                        saleDetailObj.amount = 0;
                        Restaurant.Collection.SaleDetails.update(productPromotion._id, {$set: saleDetailObj});
                    }
                })
            } else {
                Restaurant.Collection.SaleDetails.direct.remove({
                    promotionFromProductId: saleDetail.productId,
                    isPromotion: true
                });
                /*promotionQty.promotionItems.forEach(function (pro) {
                 var selector = {
                 promotionFromProductId: saleDetail.productId,
                 productId: pro.productId,
                 saleId: saleDetail.saleId,
                 isPromotion: true
                 };
                 var productPromotion = Restaurant.Collection.SaleDetails.findOne(selector);
                 if (productPromotion != null) {
                 Restaurant.Collection.SaleDetails.direct.remove(productPromotion._id);
                 }
                 });*/
            }
        } else {
            Restaurant.Collection.SaleDetails.direct.remove({
                promotionFromProductId: saleDetail.productId,
                isPromotion: true
            });
        }
    }

}
