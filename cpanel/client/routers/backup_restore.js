cpanelRoutes.route('/backup', {
    name: 'cpanel.backup',
    title: 'Backup',
    action: function (params, queryParams) {
        Layout.main('cpanel_backup');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Backup',
        parent: 'cpanel.welcome'
    }
});

cpanelRoutes.route('/restore', {
    name: 'cpanel.restore',
    title: 'Restore',
    action: function (params, queryParams) {
        Layout.main('cpanel_restore');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Restore',
        parent: 'cpanel.welcome'
    }
});
