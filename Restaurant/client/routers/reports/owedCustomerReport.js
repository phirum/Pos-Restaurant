/*
Router.route('restaurant/owedCustomerReport', function () {
    this.render('restaurant_owedCustomerReport');
}, {
    name: 'restaurant.owedCustomerReport',
    header: {title: 'Sale Report', sub: '', icon: 'file-text-o'},
    title:'restaurant-owedCustomer-report'
});

Router.route('restaurant/owedCustomerReportGen', function () {
    this.layout('reportLayout', {
        data: {
            pageSize: 'a4',
            orientation: 'portrait'
        }
    });
    var q = this.params.query;
    this.render('restaurant_owedCustomerReportGen', {
        data: function () {
            return q;
        }
    });

});
*/

restaurantRoutes.route('/owedCustomerReport', {
    name: 'restaurant.owedCustomerReport',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_customer',
            Meteor.subscribe('restaurantCustomer')
        );
        this.register(
            'restaurant_location',
            Meteor.subscribe('restaurantLocation')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_owedCustomerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'OwedCustomer Report',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/owedCustomerReportGen', {
    name: 'restaurant.owedCustomerReportGen',
    action: function (params, queryParams) {
        Layout.report('restaurant_owedCustomerReportGen');
    }
});
