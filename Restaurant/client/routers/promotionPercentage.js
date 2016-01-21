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
restaurantRoutes.route('/promotionPercentage', {
    name: 'restaurant.promotionPercentage',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_promotionPercentage',
            Meteor.subscribe('restaurantPromotionPercentage')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_promotionPercentage');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Promotion Percentage',
        parent: 'restaurant.home'
    }
});

