/*
Router.route('restaurant/backup', function () {
    this.render('restaurant_backup');
}, {
    name: 'restaurant.backup',
    header: {title: 'Backup', sub: '', icon: 'files-o'},
    title:'restaurant-backup'
});*/

var subs = new SubsManager();
restaurantRoutes.route('/backup', {
    name: 'restaurant.backup',
   /* subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_backup',
            Meteor.subscribe('restaurantBackup')
        );
    },*/
    action: function (params, queryParams) {
        Layout.main('restaurant_backup');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Backup',
        parent: 'restaurant.home'
    }
});