/*
 Router.route('restaurant/userStaff', function () {
 this.render('restaurant_userStaff');

 }, {
 name: 'restaurant.userStaff',
 header: {title: 'User Staff Mapping', sub: '', icon: 'list-alt'},
 waitOn: function () {
 return Meteor.subscribe('restaurantUserStaff');
 },
 title:'restaurant-user-staff'
 });*/

var subs = new SubsManager();
restaurantRoutes.route('/userStaff', {
    name: 'restaurant.userStaff',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_userStaff',
            Meteor.subscribe('restaurantUserStaff', {branchId: Session.get('currentBranch')})
        );
        this.register(
            'restaurant_userStaff',
            Meteor.subscribe('restaurantStaff', {branchId: Session.get('currentBranch')})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_userStaff');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'UserStaff',
        parent: 'restaurant.home'
    }
});