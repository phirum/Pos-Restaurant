var restaurantTableTPL = Template.restaurant_table;
var restaurantTableInsertTPL = Template.restaurant_tableInsert;
var restaurantTableUpdateTPL = Template.restaurant_tableUpdate;
var restaurantTableShowTPL = Template.restaurant_tableShow;

restaurantTableTPL.onRendered(function () {
    createNewAlertify(['table', 'tableShow']);
});
restaurantTableTPL.helpers({
    selector: function () {
        var selector = {};
        selector.branchId = Session.get('currentBranch');
        return selector;
    }
});
restaurantTableTPL.events({
    'click .insert': function (e, t) {
        alertify.table(fa('plus', 'Add New Table'), renderTemplate(restaurantTableInsertTPL)).maximize();
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.Tables.findOne(this._id);
        alertify.table(fa('pencil', 'Update Existing Table'), renderTemplate(restaurantTableUpdateTPL, data)).maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        var canRemove = (this._productCount == null || this._productCount == 0);
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    /* var relation = relationExist(
                     [
                     {collection: Restaurant.Collection.Products, selector: {tableId:id}}
                     ]
                     );*/
                    if (canRemove) {
                        Restaurant.Collection.Tables.remove(id, function (error) {
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
                title: '<i class="fa fa-remove"></i> Delete Table'
            });
    },
    'click .show': function (e, t) {
        alertify.tableShow(fa('eye', 'Table Detail'), renderTemplate(restaurantTableShowTPL, this))
    }
});
AutoForm.hooks({
    // Customer
    restaurant_tableInsert: {
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
    restaurant_tableUpdate: {
        onSuccess: function (formType, result) {
            alertify.table().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

