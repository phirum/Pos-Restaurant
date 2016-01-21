/*
Router.route('restaurant/sale', function () {
    this.render('restaurant_sale');

}, {
    name: 'restaurant.sale',
    header: {title: 'sale', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantSale');
    },
    title:'restaurant-sale'
});*/


var subs = new SubsManager();

restaurantRoutes.route('/saleList', {
    name: 'restaurant.saleList',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_sale',
            Meteor.subscribe('restaurantSale',{branchId:Session.get('currentBranch')})
        );
        this.register(
            'restaurant_saleDetail',
            Meteor.subscribe('restaurantSaleDetail',{branchId:Session.get('currentBranch')})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_saleList');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'SaleList',
        parent: 'restaurant.home'
    }
});