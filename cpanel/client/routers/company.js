cpanelRoutes.route('/company', {
    name: 'cpanel.company',
    title: 'Company',
    subscriptions: function (params, queryParams) {
        this.register('cpanel_company', Meteor.subscribe('cpanel_company'));
    },
    action: function (params, queryParams) {
        Layout.main('cpanel_company');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Company',
        parent: 'cpanel.welcome'
    }
});
