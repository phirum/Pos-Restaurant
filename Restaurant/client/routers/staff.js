/*
Router.route('restaurant/staff', function () {
    this.render('restaurant_staff');

}, {
    name: 'restaurant.staff',
    header: {title: 'staff', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantStaff');
    },
    title:'restaurant-staff'
});*/

var subs = new SubsManager();
restaurantRoutes.route('/staff', {
    name: 'restaurant.staff',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_staff',
            Meteor.subscribe('restaurantStaff',{branchId:Session.get('currentBranch')})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_staff');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Staff',
        parent: 'restaurant.home'
    }
});