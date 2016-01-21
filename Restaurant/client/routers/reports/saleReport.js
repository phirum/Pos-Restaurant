/*
Router.route('restaurant/saleReport', function () {
    this.render('restaurant_saleReport');
}, {
    name: 'restaurant.saleReport',
    header: {title: 'Sale Report', sub: '', icon: 'file-text-o'},
    title:'restaurant-sale-report'
});

Router.route('restaurant/saleReportGen', function () {
    this.layout('reportLayout', {
        data: {
            pageSize: 'a4',
            orientation: 'portrait'
        }
    });
    var q = this.params.query;
    this.render('restaurant_saleReportGen', {
        data: function () {
            return q;
        }
    });

});

*/

restaurantRoutes.route('/saleReport', {
    name: 'restaurant.saleReport',
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
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_saleReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'sale Report',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/saleReportGen', {
    name: 'restaurant.saleReportGen',
    action: function (params, queryParams) {
        Layout.report('restaurant_saleReportGen');
    }
});