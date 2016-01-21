FlowRouter.notFound = {
    name: 'cpanel.notFound',
    title: '404: Page not found',
    action: function () {
        Layout.main('notFound');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Not Found',
        parent: 'cpanel.welcome'
    }
};
