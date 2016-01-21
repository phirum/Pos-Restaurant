restaurantRoutes.route('/owesSupplierReport', {
    name: 'restaurant.owesSupplierReport',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_supplier',
            Meteor.subscribe('restaurantSupplier')
        );
        this.register(
            'restaurant_location',
            Meteor.subscribe('restaurantLocation')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_owesSupplierReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'OwesSupplier Report',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/owesSupplierReportGen', {
    name: 'restaurant.owesSupplierReportGen',
    action: function (params, queryParams) {
        Layout.report('restaurant_owesSupplierReportGen');
    }
});
