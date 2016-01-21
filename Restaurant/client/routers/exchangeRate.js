/*
 FlowRouter.route('restaurant/exchangeRate', function () {
 this.render('restaurant_exchangeRate');
 }, {
 name: 'restaurant.exchangeRate',
 header: {title: 'exchangeRate', sub: '', icon: 'list-alt'},
 waitOn: function () {
 return Meteor.subscribe('restaurantExchangeRate');
 },
 title:'restaurant-exchange rate'
 });*/

restaurantRoutes.route('/exchangeRate', {
    name: 'restaurant.exchangeRate',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_exchangeRate',
            Meteor.subscribe('restaurantExchangeRate', {branchId:Session.get('currentBranch')})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_exchangeRate');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'ExchangeRate',
        parent: 'restaurant.home'
    }
});
