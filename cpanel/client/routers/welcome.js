FlowRouter.route('/', {
    name: 'cpanel.welcome',
    title: 'Welcome',
    action: function (params, queryParams) {
        Layout.main('cpanel_welcome');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Welcome'
        //parent: 'cpanel.welcome'
    }
});
