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
restaurantRoutes.route('/promotionTotalAmount', {
    name: 'restaurant.promotionTotalAmount',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_promotionTotalAmount',
            Meteor.subscribe('restaurantPromotionTotalAmount')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_promotionTotalAmount');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Promotion Total Amount',
        parent: 'restaurant.home'
    }
});

