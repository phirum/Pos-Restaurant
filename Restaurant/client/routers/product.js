/*Router.route('restaurant/product', function () {
    this.render('restaurant_product');

}, {
    name: 'restaurant.product',
    header: {title: 'product', sub: '', icon: 'list-alt'},
    waitOn: function () {
        return Meteor.subscribe('restaurantProduct');
    },
    title:'restaurant-product'
});*/



var subs = new SubsManager();
restaurantRoutes.route('/product', {
    name: 'restaurant.product',
    subscriptions: function (params, queryParams) {
       this.register(
            'restaurant_image',
            Meteor.subscribe('images')
        );
        this.register(
            'restaurant_product',
            Meteor.subscribe('restaurantProduct')
        );
        this.register(
            'restaurant_category',
            Meteor.subscribe('restaurantCategory')
        );
        this.register(
            'restaurant_unit',
            Meteor.subscribe('restaurantUnit')
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_product');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Product',
        parent: 'restaurant.home'
    }
});

