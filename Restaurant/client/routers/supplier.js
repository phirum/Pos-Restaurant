/*
Router.route('restaurant/supplier', function () {
    this.render('restaurant_supplier');

}, {
    name: 'restaurant.supplier',
    header: {title: 'supplier', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantSupplier');
    },
    title:'restaurant-supplier'
});*/



var subs = new SubsManager();
restaurantRoutes.route('/supplier', {
    name: 'restaurant.supplier',
    subscriptions: function (params, queryParams) {
     this.register(
     'restaurant_supplier',
     Meteor.subscribe('restaurantSupplier',{branchId:Session.get('currentBranch')})
     );
     },
    action: function (params, queryParams) {
        Layout.main('restaurant_supplier');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Supplier',
        parent: 'restaurant.home'
    }
});