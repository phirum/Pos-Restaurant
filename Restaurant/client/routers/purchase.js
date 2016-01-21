/*
 Router.route('restaurant/purchase/:purchaseId?', function () {
 this.render('restaurant_purchase');
 },
 {
 name: 'restaurant.purchase',
 header: {title: 'Purchase', sub: '', icon: 'money'},
 data:function(){
 var purchaseId=this.params.purchaseId;
 Session.set('purchaseId',purchaseId);
 },
 title:'restaurant-purchase'
 //template:'purchase',
 //layoutTemplate:'purchaseLayout'

 }
 );

 Router.map(function () {
 this.route('restaurant/purchase/print/:purchaseId',
 {
 layoutTemplate: 'printLayout',
 // path:'/purchase/:purchaseId',
 name: 'printPurchase',
 data: function () {
 var purchaseId = this.params.purchaseId;
 Session.set('purchaseId', purchaseId);
 },
 template: 'printPurchase',
 title:'restaurant-purchase-print'
 });
 });
 */

var subs = new SubsManager();
restaurantRoutes.route('/purchaseList', {
    name: 'restaurant.purchaseList',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_purchase',
            subs.subscribe('restaurantPurchase')
        );
        this.register(
            'restaurant_purchaseDetail',
            subs.subscribe('restaurantPurchaseDetail')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_purchaseList');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'PurchaseList',
        parent: 'restaurant.home'
    }
});

var subs = new SubsManager();
restaurantRoutes.route('/purchase/:purchaseId?', {
    name: 'restaurant.purchase',
    subscriptions: function (params, queryParams) {
        var branchId=Session.get('currentBranch');
        this.register(
            'restaurant_location',
            Meteor.subscribe('restaurantLocation',{branchId:branchId})
        );
        this.register(
            'restaurant_purchase',
            Meteor.subscribe('restaurantPurchase',{branchId:branchId})
        );
        this.register(
            'restaurant_purchaseDetail',
            Meteor.subscribe('restaurantPurchaseDetail',{branchId:branchId})
        );
        this.register(
            'restaurant_product',
            Meteor.subscribe('restaurantProduct')
        );
        this.register(
            'restaurant_staff',
            Meteor.subscribe('restaurantStaff',{branchId:branchId})
        );
        this.register(
            'restaurant_userStaff',
            Meteor.subscribe('restaurantUserStaff',{branchId:branchId})
        );
        this.register(
            'restaurant_unit',
            Meteor.subscribe('restaurantUnit')
        );
        this.register(
            'restaurant_supplier',
            Meteor.subscribe('restaurantSupplier',{branchId:branchId})
        );
        this.register(
            'restaurant_exchangeRate',
            Meteor.subscribe('restaurantExchangeRate',{branchId:branchId})
        );
        this.register(
            'restaurant_stock',
            Meteor.subscribe('restaurantStock',{branchId:branchId})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_purchase');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Purchase',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/purchase/print/:purchaseId', {
    name: 'restaurant.printPurchase',
    subscriptions: function (params, queryParams) {
        var branchId=Session.get('currentBranch');
        this.register(
            'restaurant_purchase',
            subs.subscribe('restaurantPurchase',{branchId:branchId})
        );
        this.register(
            'restaurant_purchaseDetail',
            subs.subscribe('restaurantPurchaseDetail',{branchId:branchId})
        );
        this.register(
            'restaurant_product',
            subs.subscribe('restaurantProduct')
        );
        this.register(
            'restaurant_staff',
            subs.subscribe('restaurantStaff',{branchId:branchId})
        );
        this.register(
            'restaurant_userStaff',
            subs.subscribe('restaurantUserStaff')
        );
        this.register(
            'restaurant_unit',
            subs.subscribe('restaurantUnit')
        );
        this.register(
            'restaurant_supplier',
            subs.subscribe('restaurantSupplier',{branchId:branchId})
        );
        this.register(
            'restaurant_exchangeRate',
            subs.subscribe('restaurantExchangeRate',{branchId:branchId})
        );
        this.register(
            'cpanel_company',
            subs.subscribe('cpanel_company')
        );
        this.register(
            'cpanel_payment',
            subs.subscribe('restaurantPayment',{branchId:branchId})
        );
    },
    action: function (params, queryParams) {
        Layout.render('printLayout','restaurant_printPurchase');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Purchase',
        parent: 'restaurant.home'
    }

});