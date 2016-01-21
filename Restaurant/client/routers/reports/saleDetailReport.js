/*
Router.route('restaurant/saleDetailReport', function () {
    this.render('restaurant_saleDetailReport');
}, {
    name: 'restaurant.saleDetailReport',
    header: {title: 'Sale Detail Report', sub: '', icon: 'file-text-o'},
    title:'restaurant-saleDetail-report'
});

Router.route('restaurant/saleDetailReportGen', function () {
    var q = this.params.query;
    this.layout('reportLayout', {
        data: {
            pageSize: 'a4',
            orientation: 'portrait'
        }
    });

    // Generate
    this.render('restaurant_saleDetailReportGen', {
        data: function () {
            return q;
        }

    });

});


*/


restaurantRoutes.route('/saleDetailReport', {
    name: 'restaurant.saleDetailReport',
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
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_saleDetailReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'saleDetail Report',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/saleDetailReportGen', {
    name: 'restaurant.saleDetailReportGen',
    action: function (params, queryParams) {
        Layout.report('restaurant_saleDetailReportGen');
    }
});
