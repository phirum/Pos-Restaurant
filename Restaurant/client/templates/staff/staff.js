var restaurantStaffTPL = Template.restaurant_staff;
var restaurantStaffInsertTPL = Template.restaurant_staffInsert;
var restaurantStaffUpdateTPL = Template.restaurant_staffUpdate;
var restaurantStaffShowTPL = Template.restaurant_staffShow;

restaurantStaffTPL.onRendered(function () {
    createNewAlertify(['staff', 'staffShow']);
});
restaurantStaffTPL.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')};
    }
});
restaurantStaffTPL.events({
    'click .insert': function (e, t) {
        alertify.staff(fa('plus', 'Add New Staff'), renderTemplate(restaurantStaffInsertTPL)).maximize();
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.Staffs.findOne(this._id);
        alertify.staff(fa('pencil', 'Update Existing Staff'), renderTemplate(restaurantStaffUpdateTPL, data)).maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        var canRemove = (this._purchaseCount == null || this._purchaseCount == 0)
            && (this._saleCount == null || this._saleCount == 0)
            && (this._adjustmentCount == null || this._adjustmentCount == 0);
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    /* var relation = relationExist(
                     [
                     {collection: Restaurant.Collection.Sales, selector: {staffId:id}},
                     {collection: Restaurant.Collection.Purchases, selector: {staffId:id}}
                     ]
                     );*/
                    if (canRemove) {
                        Restaurant.Collection.Staffs.remove(id, function (error) {
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
                title: '<i class="fa fa-remove"></i> Delete Staff'
            });

    },
    'click .show': function (e, t) {
        alertify.staffShow(fa('eye', 'Staff Detail'), renderTemplate(restaurantStaffShowTPL, this));
    }
});

restaurantStaffInsertTPL.onRendered(function () {
    datePicker();
});
restaurantStaffUpdateTPL.onRendered(function () {
    datePicker();
});
AutoForm.hooks({
    // Customer
    restaurant_staffInsert: {
        before: {
            insert: function (doc) {
                var branchId = Session.get('currentBranch');
                doc.branchId = branchId;
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        },
        after: {
            insert: function () {
                $('select[name="status"]').select2('val', '');
                $('select[name="gender"]').select2('val', '');
            }
        }
    },
    restaurant_staffUpdate: {
        onSuccess: function (formType, result) {
            alertify.staff().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        },
        after: {
            update: function () {
                $('select[name="gender"]').select2('val', '');
                $('select[name="status"]').select2('val', '');
            }
        }
    }
});

/**
 * Config date picker
 */
var datePicker = function () {
    var dob = $('[name="startDate"]');
    DateTimePicker.date(dob);
};
