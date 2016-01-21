/*
Router.route('restaurant/stockReport', function () {

    //var role = Roles.userIsInRole(Meteor.userId(), ['reporter'], 'Sample');
    //
    //if (role) {
    this.render('restaurant_stockReport');
    //} else {
    //    this.redirect('sample.home');
    //    toastr.error('Access denied [403]', 'Error');
    //}

}, {
    name: 'restaurant.stockReport',
    header: {title: 'Stock balance report', sub: '', icon: 'file-text-o'},
    title:'restaurant-stock-report'
});

Router.route('restaurant/stockReportGen', function () {

    var q = this.params.query;
    this.layout('reportLayout', {
        data: {
            pageSize: 'a4',
            orientation: 'portrait'
        }
    });
    this.render('restaurant_stockReportGen', {
        data: function () {
            return q;
        },
        waitOn: function(){
            return Meteor.subscribe('restaurantStockHistory');
        }
    });

});


*/


restaurantRoutes.route('/stockReport', {
    name: 'restaurant.stockReport',
    subscriptions: function (params, queryParams) {
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
        Layout.main('restaurant_stockReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'stock Report',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/stockReportGen', {
    name: 'restaurant.stockReportGen',
    action: function (params, queryParams) {
        Layout.report('restaurant_stockReportGen');
    }
});
