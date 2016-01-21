/*
 Router.route('restaurant/checkout/:saleId?', function () {
 this.render('restaurant_checkout');
 },
 {
 name: 'restaurant.checkout',
 header: {title: 'Checkout', sub: '', icon: 'money'},
 data:function(){
 var saleId=this.params.saleId;
 Session.set('saleId',saleId);
 },
 title:'restaurant-checkout'
 //template:'sale',
 //layoutTemplate:'saleLayout'

 }
 );
 */


var subs = new SubsManager();
restaurantRoutes.route('/checkout/:saleId?', {
    name: 'restaurant.checkout',
    subscriptions: function (params, queryParams) {
        var branchId = Session.get('currentBranch');
        this.register(
            'restaurant_sale',
            Meteor.subscribe('restaurantSale', {branchId: branchId})
        );
        this.register(
            'restaurant_saleDetail',
            Meteor.subscribe('restaurantSaleDetail', {branchId: branchId})
        );
        this.register(
            'restaurant_exchangeRate',
            Meteor.subscribe('restaurantExchangeRate', {branchId: branchId})
        );

    },
    action: function (params, queryParams) {
        //Layout.main('restaurant_checkout');
        Layout.render('printLayout', 'restaurant_checkout');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Checkout',
        parent: 'restaurant.home'
    }
});

/*
 Router.map(function () {
 this.route('restaurant/checkout/print/:saleId',
 {
 layoutTemplate: 'printLayout',
 // path:'/checkout/:saleId',
 name: 'print',
 data: function () {
 var saleId = this.params.saleId;
 Session.set('saleId', saleId);
 },
 template: 'print',
 title:'restaurant-checkout-print'
 });
 });*/



//var subs = new SubsManager();
restaurantRoutes.route('/checkout/print/:saleId', {
    name: 'restaurant.printCheckout',
    subscriptions: function (params, queryParams) {
    },
    action: function (params, queryParams) {
        Layout.render('printLayout', 'restaurant_printCheckout');
    },
    layoutTemplate: 'printLayout'
    /* breadcrumb: {
     //params: ['id'],
     //queryParams: ['show', 'color'],
     title: 'Checkout',
     parent: 'restaurant.home'
     }*/
});