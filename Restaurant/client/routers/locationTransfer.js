restaurantRoutes.route('/locationTransfer/:locationTransferId?', {
    name: 'restaurant.locationTransfer',
    subscriptions: function (params, queryParams) {
        var branchId = Session.get('currentBranch');
        this.register(
            'restaurant_locationTransfer',
            Meteor.subscribe('restaurantLocationTransfer', {branchId: branchId})
        );
        this.register(
            'restaurant_locationTransferDetail',
            Meteor.subscribe('restaurantLocationTransferDetail', {branchId: branchId})
        );
        this.register(
            'restaurant_product',
            Meteor.subscribe('restaurantProduct')
        );
        this.register(
            'restaurant_staff',
            Meteor.subscribe('restaurantStaff', {branchId: branchId})
        );
        this.register(
            'restaurant_userStaff',
            Meteor.subscribe('restaurantUserStaff', {branchId: branchId})
        );
        this.register(
            'restaurant_customer',
            Meteor.subscribe('restaurantCustomer', {branchId: branchId})
        );
        this.register(
            'restaurant_exchangeRate',
            Meteor.subscribe('restaurantExchangeRate', {branchId: branchId})
        );
        this.register(
            'restaurant_stock',
            Meteor.subscribe('restaurantStock', {branchId: branchId})
        );
        this.register(
            'restaurant_fifoInventory',
            Meteor.subscribe('restaurantFIFOInventory', {branchId: branchId})
        );
        this.register(
            'restaurant_lifoInventory',
            Meteor.subscribe('restaurantLIFOInventory', {branchId: branchId})
        );
        this.register(
            'restaurant_averageInventory',
            Meteor.subscribe('restaurantAverageInventory', {branchId: branchId})
        );
        this.register(
            'restaurant_location',
            Meteor.subscribe('restaurantLocation')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_locationTransfer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'LocationTransfer',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/locationTransfer/print/:locationTransferId', {
    name: 'restaurant.printLocationTransfer',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_locationTransfer',
            Meteor.subscribe('restaurantLocationTransfer')
        );
        this.register(
            'restaurant_locationTransferDetail',
            Meteor.subscribe('restaurantLocationTransferDetail')
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
        this.register(
            'restaurant_customer',
            Meteor.subscribe('restaurantCustomer')
        );
        this.register(
            'restaurant_exchangeRate',
            Meteor.subscribe('restaurantExchangeRate')
        );
        this.register(
            'cpanel_company',
            Meteor.subscribe('cpanel_company')
        );
        this.register(
            'restaurant_location',
            Meteor.subscribe('restaurantLocation')
        );
    },
    action: function (params, queryParams) {
        Layout.render('printLayout', 'restaurant_printLocationTransfer');
    },
    layoutTemplate: 'printLayout'
    /* breadcrumb: {
     //params: ['id'],
     //queryParams: ['show', 'color'],
     title: 'LocationTransfer',
     parent: 'restaurant.home'
     }*/
});