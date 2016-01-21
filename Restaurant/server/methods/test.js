Meteor.methods({
    insertCustomer: function () {
        for (var i = 1; i <= 10000; i++) {
            var prefix="001-";
            var customer = {};
            customer._id = idGenerator.genWithPrefix(Restaurant.Collection.Customers, prefix, 6);
            customer.name = "Name" + i;
            customer.gender = "M";
            customer.locationId = "001-002";
            customer.branchId = "001";
            customer._branch = {};
            customer._branch.khName = "BB";
            customer._branch.enName = "Battambang";
            Restaurant.Collection.Customers.insert(customer);
        }
    },
    insertProduct: function () {
        for (var i = 1; i <= 10000; i++) {
            var product = {};

        }
    }
});