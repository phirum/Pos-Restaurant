Restaurant.Collection.Customers.before.insert(function (userId, doc) {
    var prefix=doc.branchId+"-";
    doc._id = idGenerator.genWithPrefix(Restaurant.Collection.Customers,prefix,6);
});