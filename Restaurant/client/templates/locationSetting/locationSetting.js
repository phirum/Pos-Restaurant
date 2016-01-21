var restaurantLocationSettingTPL = Template.restaurant_locationSetting;
var restaurantLocationSettingInsertTPL = Template.restaurant_locationSettingInsert;
var restaurantLocationSettingUpdateTPL = Template.restaurant_locationSettingUpdate;
//var restaurantLocationSettingShowTPL = Template.restaurant_locationSettingShow;

restaurantLocationSettingTPL.onRendered(function () {
    createNewAlertify(['locationSetting', 'locationSettingShow']);
});
restaurantLocationSettingTPL.helpers({
    selector: function () {
        var selector = {};
        selector.branchId = Session.get('currentBranch');
        return selector;
    }
});
restaurantLocationSettingTPL.events({
    'click .insert': function (e, t) {
        var locationSetting = Restaurant.Collection.LocationSettings.findOne({branchId: Session.get('currentBranch')});
        if (locationSetting != null) {
            alertify.warning('Location Setting is already had.');
        } else {
            alertify.locationSetting(fa('plus', 'Add New LocationSetting'), renderTemplate(restaurantLocationSettingInsertTPL)).maximize();
        }
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.LocationSettings.findOne(this._id);
        alertify.locationSetting(fa('pencil', 'Update Existing LocationSetting'), renderTemplate(restaurantLocationSettingUpdateTPL, data)).maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        var canRemove = (this._saleCount == null || this._saleCount == 0);
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    if (canRemove) {
                        Restaurant.Collection.LocationSettings.remove(id, function (error) {
                            if (error) {
                                alertify.error(error.message);
                            } else {
                                alertify.success("Success");
                            }
                        });
                    } else {
                        alertify.warning("Data has been used. Can't remove.");
                    }
                },
                title: '<i class="fa fa-remove"></i> Delete LocationSetting'
            });

    },
    /* 'click .show': function (e, t) {
     alertify.locationSettingShow(fa('eye','LocationSetting Detail'),renderTemplate(restaurantLocationSettingShowTPL, this));
     }*/
});

AutoForm.hooks({
    // LocationSetting
    restaurant_locationSettingInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    restaurant_locationSettingUpdate: {
        onSuccess: function (formType, result) {
            alertify.locationSetting().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});


