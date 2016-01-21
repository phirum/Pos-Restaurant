Restaurant.Collection.Staffs.before.insert(function (userId, doc) {
    var prefix=doc.branchId+"-";
    doc._id = idGenerator.genWithPrefix(Restaurant.Collection.Staffs,prefix,4);
});