Meteor.methods({
    findProducts: function (selector, option) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        selector = selector == null ? {} : selector;
        option = option == null ? {} : option;
        var products = Restaurant.Collection.Products.find(selector, option);
        var arr = [];
        products.forEach(function (product) {
            if (product.picture) {
                product.url = Images.findOne(product.picture).url();
            } else {
                product.url = '/no_image.jpg';
            }
            arr.push(product);
        });
        return arr;
    }
});