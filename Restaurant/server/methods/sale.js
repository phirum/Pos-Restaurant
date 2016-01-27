Meteor.methods({
    //Sale
    insertSaleAndSaleDetail: function (sale, saleDetail) {
        console.log(sale);
        var todayDate = moment().format('YYYYMMDD');
        var prefix = sale.branchId + "-" + todayDate;
        var saleId = idGenerator.genWithPrefix(Restaurant.Collection.Sales, prefix, 4);
        sale._id = saleId;
        Restaurant.Collection.Sales.insert(sale);
        Meteor.defer(function () {
            saleDetail.saleId = saleId;
            Restaurant.Collection.SaleDetails.insert(saleDetail);
        });
        return saleId;
    },
    insertSale: function (obj) {
        return Restaurant.Collection.Sales.insert(obj);
    },
    directInsertSale: function (obj) {
        return Restaurant.Collection.Sales.direct.insert(obj);
    },
    directUpdateSale: function (id, set) {
        Restaurant.Collection.Sales.direct.update(id, {$set: set});
    },
    updateSale: function (id, set) {
        Restaurant.Collection.Sales.update(id, {$set: set});
    },
    directInsertSaleDetails: function (obj) {
        Restaurant.Collection.SaleDetails.direct.insert(obj);
    },
    insertSaleDetails: function (obj) {
        Restaurant.Collection.SaleDetails.insert(obj);
    },
    directUpdateSaleDetails: function (id, set) {
        Restaurant.Collection.SaleDetails.direct.update(id, {$set: set});
    },
    updateSaleDetails: function (id, set) {
        Restaurant.Collection.SaleDetails.update(id, {$set: set});
    },
    cancelSale: function (saleId) {
        //Restaurant.Collection.SaleDetails.remove({saleId: saleId});
        Restaurant.Collection.Sales.remove(saleId);
    },
    directUpdateSaleDetailsStatus: function (saleId) {
        Restaurant.Collection.SaleDetails.direct.update({saleId: saleId}, {$set: {status: "Saved"}}, {multi: true});
    },

    updateToRetailSale: function (saleId) {
        Restaurant.Collection.SaleDetails.find({saleId: saleId}).forEach(function (sd) {
            var retailPrice = Restaurant.Collection.Products.findOne(sd.productId).retailPrice;
            var detailObj = {};
            detailObj.price = retailPrice;
            detailObj.amount = (detailObj.price * sd.quantity) * (1 - sd.discount / 100);
            Restaurant.Collection.Sales.direct.update(sd._id, {$set: detailObj});
        });
        var set = {};
        set.isRetail = true;
        Restaurant.Collection.Sales.update(saleId, {$set: set});
    },
    getSaleListForPayment: function (selector) {
        var list = [{
            label: "(Select One)",
            value: ""
        }];
        Restaurant.Collection.Sales.find(selector).forEach(function (obj) {
            var payment = Restaurant.Collection.Payments.findOne({
                saleId: obj._id,
                branchId: selector.branchId
                //balanceAmount: {$gt: 0}
            }, {
                sort: {
                    _id: -1,
                    paymentDate: -1
                }
            });
            if (payment == null) {
                list.push({
                    label: obj._id + ' : ' + obj._customer.name,
                    value: obj._id
                });
            } else if (payment.balanceAmount > 0) {
                list.push({
                    label: obj._id + ' : ' + obj._customer.name,
                    value: obj._id
                });
            }
        });
        return list;
    }
});