//Router.route('restaurant/restore', function () {
//    this.render('restaurant_restore');
//}, {
//    name: 'restaurant.restore',
//    header: {title: 'restore', sub: '', icon: 'files-o'},
//    title:'restaurant-restore'
//});


var subs = new SubsManager();
restaurantRoutes.route('/restore', {
    name: 'restaurant.restore',
    /* subscriptions: function (params, queryParams) {
     this.register(
     'restaurant_backup',
     Meteor.subscribe('restaurantBackup')
     );
     },*/
    action: function (params, queryParams) {
        Layout.main('restaurant_restore');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Restore',
        parent: 'restaurant.home'
    }
});