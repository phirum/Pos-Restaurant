Meteor.publish('restaurantCategory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Categories.find(selector, {removed: true});
    }
});

Meteor.publish('restaurantCustomer', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Customers.find(selector, {removed: true});
    }
});

Meteor.publish('restaurantSubCategory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.SubCategories.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantUnit', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Units.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantStaff', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Staffs.find(selector, {removed: true});
    }
});

Meteor.publish('restaurantSupplier', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Suppliers.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantProduct', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Products.find(selector, {removed: true});
    }
});

Meteor.publish('restaurantSale', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Sales.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantSaleDetail', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.SaleDetails.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantPayment', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Payments.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantPurchase', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Purchases.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantPurchaseDetail', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.PurchaseDetails.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantStock', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Stocks.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantExchangeRate', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.ExchangeRates.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantStockHistory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.StockHistories.find(selector, {removed: true});
    }
});

Meteor.publish('restaurantUserStaff', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.UserStaffs.find(selector, {removed: true});
    }
});

Meteor.publish('images', function (selector) {
    if (this.userId) {
        return Images.find()
    }
});

Meteor.publish('restaurantAdjustmentDetail', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.AdjustmentDetails.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantAdjustment', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Adjustments.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantPromotion', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Promotions.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantPromotionQty', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.PromotionQuantities.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantPromotionTotalAmount', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.PromotionTotalAmounts.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantPromotionPercentage', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.PromotionPercentages.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantFIFOInventory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.FIFOInventory.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantLIFOInventory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.LIFOInventory.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantAverageInventory', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.AverageInventory.find(selector, {removed: true});
    }
});

Meteor.publish('restaurantLocation', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Locations.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantLocationTransfer', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.LocationTransfers.find(selector, {removed: true});
    }
});
Meteor.publish('restaurantLocationTransferDetail', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.LocationTransferDetails.find(selector, {removed: true});
    }
});

Meteor.publish('restaurantLocationSetting', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.LocationSettings.find(selector, {removed: true});
    }
});

Meteor.publish('restaurantTableLocation', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.TableLocations.find(selector, {removed: true});
    }
});

Meteor.publish('restaurantTable', function (selector) {
    if (this.userId) {
        selector = selector == null ? {} : selector;
        return Restaurant.Collection.Tables.find(selector, {removed: true});
    }
});

Meteor.publish('restaurantOwedSale', function () {
    var lastWeek = new Date();
    var a = lastWeek.setDate(lastWeek.getDate() - 7);
    Counts.publish(this, 'owedSale', Restaurant.Collection.Sales.find({
        status: 'Owed',
        saleDate: {$lte: lastWeek}
    }));
    this.ready();
});
