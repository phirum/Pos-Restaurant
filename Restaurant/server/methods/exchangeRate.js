Meteor.methods({
    insertExchangeRate: function (obj) {
        var today = moment(new Date).format('YYYYMMDD') + "-";
        obj._id = idGenerator.genWithPrefix(Restaurant.Collection.ExchangeRates, today, 3);
        Restaurant.Collection.ExchangeRates.insert(obj);
    }
});