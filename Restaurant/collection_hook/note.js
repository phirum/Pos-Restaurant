Restaurant.Collection.Notes.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Restaurant.Collection.Notes,3);
});