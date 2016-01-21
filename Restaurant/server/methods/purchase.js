Meteor.methods({
    //Purchase
    insertPurchaseAndPurchaseDetail: function (purchase, purchaseDetail) {
        var purchaseId = Restaurant.Collection.Purchases.insert(purchase);
        purchaseDetail._id = idGenerator.genWithPrefix(Restaurant.Collection.PurchaseDetails, purchaseId, 3);
        purchaseDetail.purchaseId = purchaseId;
        Restaurant.Collection.PurchaseDetails.insert(purchaseDetail);
    },
    insertPurchase: function (obj) {
        return Restaurant.Collection.Purchases.insert(obj);
    },
    directInsertPurchase:function(obj){
        Restaurant.Collection.Purchases.direct.insert(obj);
    },
    updatePurchase: function (id, set,unset) {
        var updateObject = {};
        if (set != null) updateObject.$set = set;
        if (unset != null) updateObject.$unset = unset;
        Restaurant.Collection.Purchases.update(id, {$set: set});
    },
    directUpdatePurchase:function(id,set,unset){
        var updateObject = {};
        if (set != null) updateObject.$set = set;
        if (unset != null) updateObject.$unset = unset;
        Restaurant.Collection.Purchases.update(id,updateObject);
    },
    insertPurchaseDetails: function (obj) {
        Restaurant.Collection.PurchaseDetails.insert(obj);
    },
    directInsertPurchaseDetails:function(obj){
        Restaurant.Collection.PurchaseDetails.direct.insert(obj);
    },
    updatePurchaseDetails: function (id, set) {
        Restaurant.Collection.PurchaseDetails.update(id, {$set: set});
    },
    directUpdatePurchaseDetails:function(id,set,unset){
        var updateObject = {};
        if (set != null) updateObject.$set = set;
        if (unset != null) updateObject.$unset = unset;
        Restaurant.Collection.PurchaseDetails.direct.update(id,updateObject);
    },
    cancelPurchase: function (purchaseId) {
      //  Restaurant.Collection.PurchaseDetails.remove({purchaseId: purchaseId});
        Restaurant.Collection.Purchases.remove(purchaseId);
    }
});