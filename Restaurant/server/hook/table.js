Restaurant.Collection.Tables.before.insert(function (userId, doc) {
    var prefix = doc.branchId + "-";
    doc._id = idGenerator.genWithPrefix(Restaurant.Collection.Tables, prefix, 5);
    doc.left=250;
    doc.top=300;
    var lastTable=Restaurant.Collection.Tables.findOne({tableLocationId:doc.tableLoctionId},{sort:{_id:-1}});
});
