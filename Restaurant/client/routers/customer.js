/*
Router.route('restaurant/customer', function () {
    this.render('restaurant_customer');

}, {
    name: 'restaurant.customer',
    header: {title: 'Customer', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantCustomer');
    },
    title:'restaurant-customer'
});
*/


var subs = new SubsManager();

restaurantRoutes.route('/customer', {
    name: 'restaurant.customer',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_customer',
            Meteor.subscribe('restaurantCustomer',{branchId:Session.get('currentBranch')})
        );
        /*this.register(
            'restaurant_location',
            Meteor.subscribe('restaurantLocation',{branchId:Session.get('currentBranch')})
        );*/
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_customer');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer',
        parent: 'restaurant.home'
    }
});