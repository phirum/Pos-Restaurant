AutoForm.addInputType("inputmask", {
    template: "afInputmask",
    valueIn: function (val, atts) {
        return val;
    },
    valueOut: function () {
        return this.val();
    }
});

Template.afInputmask.onRendered(function () {
    var $input = this.$('input');
    var data = this.data;
    var opts = data.atts.opts || {};

    // Check opts
    if (typeof opts == 'function') {
        opts = opts();
    }

    $input.inputmask(opts);
});

Template.afInputmask.helpers({
    atts: function addFormControlAtts() {
        var atts = _.clone(this.atts);
        // Add bootstrap class
        atts = AutoForm.Utility.addClass(atts, "form-control");
        delete atts.opts;

        return atts;
    }
});

Template.afInputmask.onDestroyed(function () {
    var $input = this.$('input');
    if ($input) {
        $input.inputmask('remove');
    }
});
