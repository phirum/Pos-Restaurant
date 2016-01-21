Meteor.methods({
    //Adjustment
    insertAdjustmentAndAdjustmentDetail: function (adjustment, adjustmentDetail) {
        var adjustmentId = Restaurant.Collection.Adjustments.insert(adjustment);
        adjustmentDetail._id = idGenerator.genWithPrefix(
            Restaurant.Collection.AdjustmentDetails, adjustmentId, 3);
        adjustmentDetail.adjustmentId = adjustmentId;
        Restaurant.Collection.AdjustmentDetails.insert(adjustmentDetail);
    },
    directInsertAdjustment: function (obj) {
        Restaurant.Collection.AdjustmentDetails.direct.insert(obj);
    },
    insertAdjustment: function (obj) {
        Restaurant.Collection.Adjustments.insert(obj);
    },
    directUpdateAdjustment: function (id, set, unset) {
        var updateObject = {};
        if (set != null) updateObject.$set = set;
        if (unset != null) updateObject.$unset = unset;
        Restaurant.Collection.Adjustments.direct.update(id, updateObject)
    },
    updateAdjustment: function (id, set, unset) {
        var updateObject = {};
        if (set != null) updateObject.$set = set;
        if (unset != null) updateObject.$unset = unset;
        Restaurant.Collection.Adjustments.update(id, updateObject);
    },
    directInsertAdjustmentDetails: function (obj) {
        Restaurant.Collection.AdjustmentDetails.direct.insert(obj);
    },
    insertAdjustmentDetails: function (obj) {
        Restaurant.Collection.AdjustmentDetails.insert(obj);
    },
    directUpdateAdjustmentDetails: function (id, set, unset) {
        var updateObject = {};
        if (set != null) updateObject.$set = set;
        if (unset != null) updateObject.$unset = unset;
        Restaurant.Collection.AdjustmentDetails.direct.update(id, updateObject)
    },
    updateAdjustmentDetails: function (id, set, unset) {
        var updateObject = {};
        if (set != null) updateObject.$set = set;
        if (unset != null) updateObject.$unset = unset;
        Restaurant.Collection.AdjustmentDetails.update(id, updateObject);
    },
    cancelAdjustment: function (adjustmentId) {
        //Restaurant.Collection.AdjustmentDetails.remove({adjustmentId: adjustmentId});
        Restaurant.Collection.Adjustments.remove(adjustmentId);
    }
});