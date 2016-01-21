/*
Router.route('restaurant/unit', function () {
    this.render('restaurant_unit');

}, {
    name: 'restaurant.unit',
    header: {title: 'unit', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantUnit');
    },
    title:'restaurant-unit'
});*/


var subs = new SubsManager();
restaurantRoutes.route('/unit', {
    name: 'restaurant.unit',
    subscriptions: function (params, queryParams) {
     this.register(
     'restaurant_unit',
     Meteor.subscribe('restaurantUnit')
     );
     },
    action: function (params, queryParams) {
        Layout.main('restaurant_unit');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Unit',
        parent: 'restaurant.home'
    }
});