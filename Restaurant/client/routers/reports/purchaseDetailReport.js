/*
Router.route('restaurant/purchaseDetailReport', function () {
    this.render('restaurant_purchaseDetailReport');
}, {
    name: 'restaurant.purchaseDetailReport',
    header: {title: 'Purchase Detail Report', sub: '', icon: 'file-text-o'},
    title:'restaurant-purchaseDetail-report'
});

Router.route('restaurant/purchaseDetailReportGen', function () {
    var q = this.params.query;
    this.layout('reportLayout', {
        data: {
            pageSize: 'a4',
            orientation: 'portrait'
        }
    });

    // Generate
    this.render('restaurant_purchaseDetailReportGen', {
        data: function () {
            return q;
        }

    });

});


*/
restaurantRoutes.route('/purchaseDetailReport', {
    name: 'restaurant.purchaseDetailReport',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_supplier',
            Meteor.subscribe('restaurantSupplier')
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
        Layout.main('restaurant_purchaseDetailReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'purchaseDetail Report',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/purchaseDetailReportGen', {
    name: 'restaurant.purchaseDetailReportGen',
    action: function (params, queryParams) {
        Layout.report('restaurant_purchaseDetailReportGen');
    }
});