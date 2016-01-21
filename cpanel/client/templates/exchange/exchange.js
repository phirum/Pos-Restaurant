// Declare template
var indexTpl = Template.cpanel_exchange,
    insertTpl = Template.cpanel_exchangeInsert,
    updateTpl = Template.cpanel_exchangeUpdate,
    showTpl = Template.cpanel_exchangeShow;

// Index
indexTpl.onCreated(function () {
});

indexTpl.onRendered(function () {
    // Create new  alertify
    createNewAlertify("exchange", {size: 'lg'});
});

indexTpl.events({
    'click .insert': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(insertTpl));
    },
    'click .update': function (e, t) {
        alertify.exchange(fa("pencil", "Exchange"), renderTemplate(updateTpl, this));
    },
    'click .remove': function (e, t) {
        var id = this._id;

        alertify.confirm(
            fa("remove", "Exchange"),
            "Are you sure to delete [" + this.dateTime + "]?",
            function () {

                Cpanel.Collection.Exchange.remove(id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null);
    },
    'click .show': function (e, t) {
        this.ratesVal = JSON.stringify(this.rates);
        alertify.alert(fa("eye", "Exchange"), renderTemplate(showTpl, this).html);
    }
});

// Insert
insertTpl.onRendered(function () {
});

insertTpl.helpers({
    doc: function () {
        var khr = 0, usd = 0, thb = 0;
        var baseCurrency = Cpanel.Collection.Setting.findOne().baseCurrency;

        if (baseCurrency == 'KHR') {
            khr = 1;
        } else if (baseCurrency == 'USD') {
            usd = 1;
        } else {
            thb = 1;
        }

        return {base: baseCurrency, khr: khr, usd: usd, thb: thb};
    }
});

// Update
updateTpl.onCreated(function () {
    this.subscribe('cpanel_exchangeById', this.data._id);
});

updateTpl.onRendered(function () {
});

updateTpl.helpers({
    data: function () {
        var data = Cpanel.Collection.Exchange.findOne(this._id);
        return data;
    }
});

// Hook
AutoForm.hooks({
    cpanel_exchangeInsert: {
        onSuccess: function (formType, result) {
            alertify.exchange().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    cpanel_exchangeUpdate: {
        onSuccess: function (formType, error) {
            alertify.exchange().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
