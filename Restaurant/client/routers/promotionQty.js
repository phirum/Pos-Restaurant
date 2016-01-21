/*Router.route('restaurant/product', function () {
    this.render('restaurant_product');

}, {
    name: 'restaurant.product',
    header: {title: 'product', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantProduct');
    },
    title:'restaurant-product'
});*/



var subs = new SubsManager();
restaurantRoutes.route('/promotionQty', {
    name: 'restaurant.promotionQty',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_promotionQty',
            Meteor.subscribe('restaurantPromotionQty')
        );
        this.register(
            'restaurant_product',
            Meteor.subscribe('restaurantProduct')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_promotionQty');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Promotion Quantity',
        parent: 'restaurant.home'
    }
});

