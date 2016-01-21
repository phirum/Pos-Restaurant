restaurantRoutes.route('/productDetail', {
    name: 'restaurant.productDetail',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_customer',
            Meteor.subscribe('restaurantCustomer')
        );
        this.register(
            'restaurant_staff',
            Meteor.subscribe('restaurantStaff')
        );
        this.register(
            'restaurant_location',
            Meteor.subscribe('restaurantLocation')
        );
        this.register(
            'restaurant_category',
            Meteor.subscribe('restaurantCategory')
        )
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_productDetail');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'sale Report',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/productDetailGen', {
    name: 'restaurant.productDetailGen',
    action: function (params, queryParams) {
        Layout.report('restaurant_productDetailGen');
    }
});