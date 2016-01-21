var restaurantTableLocationTPL = Template.restaurant_tableLocation;
var restaurantTableLocationInsertTPL = Template.restaurant_tableLocationInsert;
var restaurantTableLocationUpdateTPL = Template.restaurant_tableLocationUpdate;
var restaurantTableLocationShowTPL = Template.restaurant_tableLocationShow;

restaurantTableLocationTPL.onRendered(function () {
    createNewAlertify(['tableLocation', 'tableLocationShow']);
});
restaurantTableLocationTPL.helpers({
    selector: function () {
        var selector = {};
        selector.branchId = Session.get('currentBranch');
        return selector;
    }
});
restaurantTableLocationTPL.events({
    'click .insert': function (e, t) {
        alertify.tableLocation(fa('plus', 'Add New TableLocation'), renderTemplate(restaurantTableLocationInsertTPL)).maximize();
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.TableLocations.findOne(this._id);
        alertify.tableLocation(fa('pencil', 'Update Existing TableLocation'), renderTemplate(restaurantTableLocationUpdateTPL, data)).maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        var canRemove = (this._productCount == null || this._productCount == 0);
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    /* var relation = relationExist(
                     [
                     {collection: Restaurant.Collection.Products, selector: {tableLocationId:id}}
                     ]
                     );*/
                    if (canRemove) {
                        Restaurant.Collection.TableLocations.remove(id, function (error) {
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
                title: '<i class="fa fa-remove"></i> Delete TableLocation'
            });
    },
    'click .show': function (e, t) {
        alertify.tableLocationShow(fa('eye', 'TableLocation Detail'), renderTemplate(restaurantTableLocationShowTPL, this))
    }
});
AutoForm.hooks({
    // Customer
    restaurant_tableLocationInsert: {
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
    restaurant_tableLocationUpdate: {
        onSuccess: function (formType, result) {
            alertify.tableLocation().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

