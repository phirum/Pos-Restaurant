Meteor.methods({
    //Sale
    insertSaleAndSaleDetail: function (sale, saleDetail) {
        var todayDate = moment().format('YYYYMMDD');
        var prefix = sale.branchId + "-" + todayDate;
        var saleId= idGenerator.genWithPrefix(Restaurant.Collection.Sales, prefix, 4);
        sale._id=saleId;
        Restaurant.Collection.Sales.insert(sale);
        saleDetail.saleId = saleId;
        Restaurant.Collection.SaleDetails.insert(saleDetail);
        return saleId;
    },
    insertSale: function (obj) {
        return Restaurant.Collection.Sales.insert(obj);
    },
    directInsertSale:function(obj){
        return Restaurant.Collection.Sales.direct.insert(obj);
    },
    directUpdateSale:function(id,set){
        Restaurant.Collection.Sales.direct.update(id,{$set:set});
    },
    updateSale: function (id, set) {
        Restaurant.Collection.Sales.update(id, {$set: set});
    },
    directInsertSaleDetails:function(obj){
        Restaurant.Collection.SaleDetails.direct.insert(obj);
    },
    insertSaleDetails: function (obj) {
        Restaurant.Collection.SaleDetails.insert(obj);
    },
    directUpdateSaleDetails:function(id,set){
        Restaurant.Collection.SaleDetails.direct.update(id,{$set:set});
    },
    updateSaleDetails: function (id, set) {
        Restaurant.Collection.SaleDetails.update(id, {$set: set});
    },
    cancelSale: function (saleId) {
        //Restaurant.Collection.SaleDetails.remove({saleId: saleId});
        Restaurant.Collection.Sales.remove(saleId);
    },
    updateToRetailSale:function(saleId){
        Restaurant.Collection.SaleDetails.find({saleId: saleId}).forEach(function (sd) {
            var retailPrice = Restaurant.Collection.Products.findOne(sd.productId).retailPrice;
            var detailObj = {};
            detailObj.price = retailPrice;
            detailObj.amount = (detailObj.price * sd.quantity) * (1 - sd.discount / 100);
            Restaurant.Collection.Sales.direct.update(sd._id, {$set: detailObj});
        });
        var set={};
        set.isRetail = true;
        Restaurant.Collection.Sales.update(saleId, {$set: set});
    }
});