Meteor.methods({
    insertPayment: function (obj) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        var prefix = obj.saleId;
        obj._id = idGenerator.genWithPrefix(Restaurant.Collection.Payments, prefix, 3);
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