Meteor.methods({
    test:function(){
        var arr=['a','b','c','p','test'];
        var arr1=['a','b','c','d','o'];
        return arr.concat(arr1);
    },
    removeFromStock: function (saleId, branchId) {
        var saleDetails = Restaurant.Collection.SaleDetails.find({saleId: saleId});
        var prefix = branchId + "-";
        saleDetails.forEach(function (sd) {
            var product = Restaurant.Collection.Products.findOne(sd.productId);
            if (product.productType == "Stock") {
                var stock = Restaurant.Collection.Stocks.findOne({productId: sd.productId, branchId: branchId});
                if (stock == null) {
                    var obj = {};
                    obj._id = idGenerator.genWithPrefix(Restaurant.Collection.Stocks, prefix, 6);
                    obj.productId = sd.productId;
                    obj.branchId = branchId;
                    obj.quantity = 0 - sd.quantity;
                    Meteor.call('insertStock', obj);
                } else {
                    var set = {};
                    set.quantity = stock.quantity - sd.quantity;
                    Meteor.call('updateStock', stock._id, set);
                }
            }
        });
    },
    addToStock: function (saleId, branchId) {

    },
    updateCategoriesCount: function () {
        var categories = Restaurant.Collection.Categories.find();
        categories.forEach(function (c) {
            var count = Restaurant.Collection.Categories.find({parentId: c._id}).count();
            Restaurant.Collection.Categories.direct.update(c._id, {$set: {_categoryCount: count}});
        });
    }
});