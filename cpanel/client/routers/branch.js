cpanelRoutes.route('/branch', {
    name: 'cpanel.branch',
    title: 'Branch',
    action: function (params, queryParams) {
        Layout.main('cpanel_branch');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Branch',
        parent: 'cpanel.welcome'
    }
});
