/*
Router.route('restaurant/note', function () {
    this.render('restaurant_note');

}, {
    name: 'restaurant.note',
    header: {title: 'note', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantNote');
    },
    title:'restaurant-note'
});*/


var subs = new SubsManager();
restaurantRoutes.route('/note', {
    name: 'restaurant.note',
    subscriptions: function (params, queryParams) {
     this.register(
     'restaurant_note',
     Meteor.subscribe('restaurantNote')
     );
     },
    action: function (params, queryParams) {
        Layout.main('restaurant_note');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Note',
        parent: 'restaurant.home'
    }
});