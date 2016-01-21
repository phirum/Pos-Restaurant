/*Router.route('restaurant/purchaseReport', function () {
        this.render('restaurant_purchaseReport');
    },
    {
        name: 'restaurant.purchaseReport',
        header: {title: 'Purchase Report', sub: '', icon: 'file-text-o'},
        title:'restaurant-purchase-report'
    });
Router.route('restaurant/purchaseReportGen', function () {
    var q = this.params.query;
    this.layout('reportLayout', {
        data: {
            pageSize: 'a4',
            orientation: 'portrait'
        }
    });
    this.render('restaurant_purchaseReportGen', {
        data: function () {
            return q;
        }
    });
});*/



restaurantRoutes.route('/purchaseReport', {
    name: 'restaurant.purchaseReport',
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
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_purchaseReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'purchase Report',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/purchaseReportGen', {
    name: 'restaurant.purchaseReportGen',
    action: function (params, queryParams) {
        Layout.report('restaurant_purchaseReportGen');
    }
});


