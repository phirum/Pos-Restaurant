Restaurant.Schema.ProductDetails = new SimpleSchema({
    categoryId: {
        type: String,
        optional: true,
        autoform: {
            type: 'select2',
            options: function() {
                return Restaurant.List.category('All');
            }
        }
    }
});