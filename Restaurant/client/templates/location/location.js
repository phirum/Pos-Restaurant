var restaurantLocationTPL = Template.restaurant_location;
var restaurantLocationInsertTPL = Template.restaurant_locationInsert;
var restaurantLocationUpdateTPL = Template.restaurant_locationUpdate;
var restaurantLocationShowTPL = Template.restaurant_locationShow;

restaurantLocationTPL.onRendered(function () {
    createNewAlertify(['location', 'locationShow']);
});
restaurantLocationTPL.helpers({
    selector: function () {
        var selector = {};
        selector.branchId = Session.get('currentBranch');
        return selector;
    }
});
restaurantLocationTPL.events({
    'click .insert': function (e, t) {
        alertify.location(fa('plus', 'Add New Location'), renderTemplate(restaurantLocationInsertTPL)).maximize();
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.Locations.findOne(this._id);
        alertify.location(fa('pencil', 'Update Existing Location'), renderTemplate(restaurantLocationUpdateTPL, data)).maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        var canRemove = (this._productCount == null || this._productCount == 0);
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    /* var relation = relationExist(
                     [
                     {collection: Restaurant.Collection.Products, selector: {locationId:id}}
                     ]
                     );*/
                    if (canRemove) {
                        Restaurant.Collection.Locations.remove(id, function (error) {
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
                title: '<i class="fa fa-remove"></i> Delete Location'
            });
    },
    'click .show': function (e, t) {
        alertify.locationShow(fa('eye', 'Location Detail'), renderTemplate(restaurantLocationShowTPL, this))
    }
});
AutoForm.hooks({
    // Customer
    restaurant_locationInsert: {
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
    restaurant_locationUpdate: {
        onSuccess: function (formType, result) {
            alertify.location().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

