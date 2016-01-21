cpanelRoutes.route('/eventReport', {
    name: 'cpanel.eventReport',
    title: 'Event Report',
    action: function (params, queryParams) {
        Layout.main('cpanel_eventReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Event Report',
        parent: 'cpanel.welcome'
    }
});

cpanelRoutes.route('/eventReportGen', {
    name: 'cpanel.eventReportGen',
    title: 'Event Report',
    action: function (params, queryParams) {
        Layout.report('cpanel_eventReportGen');
    }
});
