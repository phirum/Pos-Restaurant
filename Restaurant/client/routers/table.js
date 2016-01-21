
var subs = new SubsManager();
restaurantRoutes.route('/table', {
    name: 'restaurant.table',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_table',
            Meteor.subscribe('restaurantTable')
        );
        this.register(
            'restaurant_tableLocation',
            Meteor.subscribe('restaurantTableLocation')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_table');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Table',
        parent: 'restaurant.home'
    }
});