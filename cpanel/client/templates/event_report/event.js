// Declare template
var formTpl = Template.cpanel_eventReport,
    genTpl = Template.cpanel_eventReportGen;

// Form
formTpl.onCreated(function () {
});

formTpl.onRendered(function () {
});

// Hook
AutoForm.hooks({
    cpanel_eventReport: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();

            // You must call this.done()!
            //this.done(); // submitted successfully, call onSuccess
            //this.done(new Error('foo')); // failed to submit, call onError with the provided error
            this.done(null, insertDoc); // submitted successfully, call onSuccess with `result` arg set to "foo"
            //return false;
        },
        onSuccess: function (formType, result) {
            var params = {};
            var queryParams = result;
            var path = FlowRouter.path("cpanel.eventReportGen", params, queryParams);

            window.open(path, '_blank');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Generate
genTpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {fontSize: 'bg', paper: 'a4', orientation: 'portrait'};
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId, 'capnel_eventReport', q);

        if (!call.ready()) {
            return false;
        }

        return call.result();
    }
});
