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
restaurantRoutes.route('/promotion', {
    name: 'restaurant.promotion',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_promotion',
            Meteor.subscribe('restaurantPromotion')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_promotion');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Promotion',
        parent: 'restaurant.home'
    }
});

