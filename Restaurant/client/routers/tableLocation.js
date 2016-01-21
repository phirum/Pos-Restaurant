
var subs = new SubsManager();
restaurantRoutes.route('/tableLocation', {
    name: 'restaurant.tableLocation',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_tableLocation',
            Meteor.subscribe('restaurantTableLocation')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_tableLocation');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'TableLocation',
        parent: 'restaurant.home'
    }
});