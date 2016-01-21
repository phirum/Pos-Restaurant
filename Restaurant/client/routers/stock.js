/*
Router.route('restaurant/stock', function () {
    this.render('restaurant_stock');
}, {
    name: 'restaurant.stock',
    header: {title: 'Stock', sub: '', icon: 'list-alt'},
    title:'restaurant-stock'
});*/


var subs = new SubsManager();
restaurantRoutes.route('/stock', {
    name: 'restaurant.stock',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_stock',
            Meteor.subscribe('restaurantStock',{branchId:Session.get('currentBranch')})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_stock');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Stock',
        parent: 'restaurant.home'
    }
});