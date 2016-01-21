/*
Router.route('restaurant/myCustomerReport', function () {

    //var role = Roles.userIsInRole(Meteor.userId(), ['reporter'], 'Sample');
    //
    //if (role) {
    this.render('restaurant_myCustomerReport');
    //} else {
    //    this.redirect('restaurant.home');
    //    toastr.error('Access denied [403]', 'Error');
    //}

}, {
    name: 'restaurant.myCustomerReport',
    header: {title: 'my customer', sub: '', icon: 'file-text-o'},
    title:'restaurant-customer-report'
});

Router.route('restaurant/myCustomerReportGen', function () {

    var q = this.params.query;

    // Config layout
    this.layout('reportLayout', {
        // Page setup: Size: a4, a5, mini | Orientation: portrait, landscape
        // Sign footer: boolean (default is false)
        data: {
            pageSetup: {
                size: 'a4',
                orientation: 'portrait'
            },
            sign: true
        }
    });

    // Generate
    this.render('restaurant_myCustomerReportGen', {
        data: function () {

            var selector = {name: {$regex: q.name}};
            //if (q.name !== null) {
            //    selector["name"] = {$text: q.name};
            //}
            //
            return {
                title: function () {
                    return {
                        company: function () {
                            return Cpanel.Collection.Company.findOne();
                        },
                        branch: function () {
                            return Cpanel.Collection.Branch.findOne();
                        },
                        reportName: 'My Customer Report',
                        date: q.date
                    };
                },
                header: function () {
                    return [
                        {col1: 'Staff: Rabbit', col2: 'Customer: like ' + q.name, col3: 'Filter: ....'},
                        {col1: 'Gender: ...', col2: 'Filter: ...........'}
                    ];
                },
                content: function () {
                    return Sample.Collection.Customer.find(selector);
                },
                footer: 'footer'
            }
        }

    });

});
*/



/**
 * Browser view
 */
restaurantRoutes.route('/myCustomerReport', {
    name: 'restaurant.myCustomerReport',
    action: function (params, queryParams) {
        Layout.main('restaurant_myCustomerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Report',
        parent: 'restaurant.home'
    }
});

restaurantRoutes.route('/myCustomerReportGen', {
    name: 'restaurant.myCustomerReportGen',
    action: function (params, queryParams) {
        Layout.report('restaurant_myCustomerReportGen');
    }
});

/**
 * Excel
 */

