/*
Router.route('restaurant/subCategory', function () {
    this.render('restaurant_subCategory');

}, {
    name: 'restaurant.subCategory',
    header: {title: 'subCategory', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantSubCategory');
    },
    title:'restaurant-sub Category'
});*/



var subs = new SubsManager();

restaurantRoutes.route('/subCategory', {
    name: 'restaurant.subCategory',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_subCategory',
            Meteor.subscribe('restaurantSubCategory')
        );
        this.register(
            'restaurant_category',
            Meteor.subscribe('restaurantCategory')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_subCategory');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'SubCategory',
        parent: 'restaurant.home'
    }
});