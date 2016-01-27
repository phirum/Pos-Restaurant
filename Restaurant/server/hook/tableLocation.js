Restaurant.Collection.TableLocations.before.insert(function (userId, doc) {
    var prefix = doc.branchId + "-";
    doc._id = idGenerator.genWithPrefix(Restaurant.Collection.TableLocations, prefix, 3);
});
