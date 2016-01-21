/*Router.route('restaurant/category', function () {
    this.render('restaurant_category');

}, {
    name: 'restaurant.category',
    header: {title: 'Category', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantCategory');
    },
    title:'restaurant-category'
});*/

var subs = new SubsManager();

restaurantRoutes.route('/category', {
    name: 'restaurant.category',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_category',
            Meteor.subscribe('restaurantCategory')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_category');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Category',
        parent: 'restaurant.home'
    }
});
