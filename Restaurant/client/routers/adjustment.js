/*
 Router.route('restaurant/adjustment/:adjustmentId?', function () {
 this.render('restaurant_adjustment');
 },
 {
 name: 'restaurant.adjustment',
 header: {title: 'Adjustment', sub: '', icon: 'money'},
 data:function(){
 var adjustmentId=this.params.adjustmentId;
 Session.set('adjustmentId',adjustmentId);
 },
 title:"restaurant-adjustment"
 }
 );
 */
var subs = new SubsManager();
restaurantRoutes.route('/adjustment/:adjustmentId?', {
    name: 'restaurant.adjustment',
    subscriptions: function (params, queryParams) {
        var branchId=Session.get('currentBranch');
        this.register(
            'restaurant_adjustment',
            Meteor.subscribe('restaurantAdjustment',{branchId:branchId})
        );
        this.register(
            'restaurant_adjustmentDetail',
            Meteor.subscribe('restaurantAdjustmentDetail',{branchId:branchId})
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
            Meteor.subscribe('restaurantUnit',{branchId:branchId})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_adjustment');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Adjustment',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/adjustment/print/:adjustmentId', {
    name: 'restaurant.printPurchase',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_adjustment',
            Meteor.subscribe('restaurantSale')
        );
        this.register(
            'restaurant_adjustmentDetail',
            Meteor.subscribe('restaurantSaleDetail')
        );
        this.register(
            'restaurant_product',
            Meteor.subscribe('restaurantProduct')
        );
        this.register(
            'restaurant_staff',
            Meteor.subscribe('restaurantStaff')
        );
        this.register(
            'restaurant_userStaff',
            Meteor.subscribe('restaurantUserStaff')
        );
        this.register(
            'restaurant_unit',
            Meteor.subscribe('restaurantUnit')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_printAdjustment');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Adjustment',
        parent: 'restaurant.home'
    }
});