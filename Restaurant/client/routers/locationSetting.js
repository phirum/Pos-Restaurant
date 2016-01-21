
var subs = new SubsManager();
restaurantRoutes.route('/locationSetting', {
    name: 'restaurant.locationSetting',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_locationSetting',
            Meteor.subscribe('restaurantLocationSetting')
        );
        this.register(
            'restaurant_location',
            Meteor.subscribe('restaurantLocation')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_locationSetting');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'LocationSetting',
        parent: 'restaurant.home'
    }
});