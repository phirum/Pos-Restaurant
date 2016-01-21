Meteor.methods({
    insertPayment: function (obj) {
        Restaurant.Collection.Payments.insert(obj);
    },
    directInsertPayment: function (obj) {
        Restaurant.Collection.Payments.direct.insert(obj);
    },
    updatePayment: function (id, set) {
        Restaurant.Collection.Payments.update(id, {$set: set});
    },
    directUpdatePayment: function (id, set, unset) {
        var updateObject = {};
        if (set != null) updateObject.$set = set;
        if (unset != null) updateObject.$unset = unset;
        Restaurant.Collection.Payments.direct.update(id, updateObject)
    }
});