
var subs = new SubsManager();
restaurantRoutes.route('/location', {
    name: 'restaurant.location',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_location',
            Meteor.subscribe('restaurantLocation')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_location');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Location',
        parent: 'restaurant.home'
    }
});