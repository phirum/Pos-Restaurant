/*
Router.route('restaurant/endOfProcess', function () {
    this.render('restaurant_endOfProcess');
}, {
    name: 'restaurant.endOfProcess',
    header: {title: 'EndOfProcess', sub: '', icon: 'list-alt'},
    title:'restaurant-end of process'
});*/


//var subs = new SubsManager();

restaurantRoutes.route('/endOfProcess', {
    name: 'restaurant.endOfProcess',
    /* subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_customer',
            Meteor.subscribe('restaurantCustomer')
        );
    },*/
    action: function (params, queryParams) {
        Layout.main('restaurant_endOfProcess');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'EndOfProcess',
        parent: 'restaurant.home'
    }
});
