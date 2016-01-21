/*
Router.route('restaurant/purchasePayment', function () {
    this.render('restaurant_purchasePayment');

}, {
    name: 'restaurant.purchasePayment',
    header: {title: 'PurchasePayment', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantPurchasePayment');
    },
    title:'restaurant-purchasePayment'
});*/

var subs = new SubsManager();
restaurantRoutes.route('/purchasePayment', {
    name: 'restaurant.purchasePayment',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_purchasePayment',
            Meteor.subscribe('restaurantPayment',{branchId:Session.get('currentBranch')})
        );
        this.register(
            'restaurant_purchase',
            Meteor.subscribe('restaurantPurchase',{branchId:Session.get('currentBranch')})
        );
        this.register(
            'restaurant_supplier',
            Meteor.subscribe('restaurantSupplier',{branchId:Session.get('currentBranch')})
        );
        this.register(
            'restaurant_exchangeRate',
            Meteor.subscribe('restaurantExchangeRate',{branchId:Session.get('currentBranch')})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_purchasePayment');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'PurchasePayment',
        parent: 'restaurant.home'
    }
});