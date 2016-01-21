/*Router.route('restaurant/home', function () {

    this.render('restaurant_home');

}, {
    name: 'restaurant.home',
    header: {title: 'home', sub: '', icon: 'home'},
    title:'restaurant-home'
});*/


restaurantRoutes.route('/home', {
    name: 'restaurant.home',
    action: function (params, queryParams) {
        Layout.main('restaurant_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Home'
        //parent: 'Home'
    }
});


