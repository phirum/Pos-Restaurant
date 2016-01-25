var subs = new SubsManager();
restaurantRoutes.route('/tableView', {
    name: 'restaurant.tableView',
    subscriptions: function (params, queryParams) {
        this.register(
            'restaurant_table',
            Meteor.subscribe('restaurantTable', {branchId: Session.get('currentBranch')})
        );
        this.register(
            'restaurant_tableLocation',
            Meteor.subscribe('restaurantTableLocation', {branchId: Session.get('currentBranch')})
        );
        this.register(
            'restaurant_sales',
            Meteor.subscribe('restaurantSale', {branchId: Session.get('currentBranch'), status: "Unsaved"})
        );
    },
    action: function (params, queryParams) {
        Layout.main('restaurant_tableView');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'TableView',
        parent: 'restaurant.home'
    }
});