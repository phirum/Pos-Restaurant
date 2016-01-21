var subs = new SubsManager();
restaurantRoutes.route('/tableView', {
    name: 'restaurant.tableView',
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
        Layout.main('restaurant_tableView');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'TableView',
        parent: 'restaurant.home'
    }
});