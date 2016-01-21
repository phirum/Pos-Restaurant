/*
Router.route('restaurant/salePayment', function () {
    this.render('restaurant_salePayment');

}, {
    name: 'restaurant.salePayment',
    header: {title: 'SalePayment', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantSalePayment');
    },
    title:'restaurant-salePayment'
});*/

var subs = new SubsManager();
restaurantRoutes.route('/salePayment', {
    name: 'restaurant.salePayment',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_salePayment',
            Meteor.subscribe('restaurantPayment',{branchId:Session.get('currentBranch')})
        );
        this.register(
            'restaurant_sale',
            Meteor.subscribe('restaurantSale',{branchId:Session.get('currentBranch')})
        );
        this.register(
            'restaurant_customer',
            Meteor.subscribe('restaurantCustomer',{branchId:Session.get('currentBranch')})
        );
        this.register(
            'restaurant_exchangeRate',
            Meteor.subscribe('restaurantExchangeRate',{branchId:Session.get('currentBranch')})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_salePayment');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'SalePayment',
        parent: 'restaurant.home'
    }
});