var restaurantSupplierTPL = Template.restaurant_supplier;
var restaurantSupplierInsertTPL = Template.restaurant_supplierInsert;
var restaurantSupplierUpdateTPL = Template.restaurant_supplierUpdate;
var restaurantSupplierShowTPL = Template.restaurant_supplierShow;

restaurantSupplierTPL.onRendered(function () {
    createNewAlertify(['supplier', 'supplierShow']);
});
restaurantSupplierTPL.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')};
    }
});
restaurantSupplierTPL.events({
    'click .insert': function (e, t) {
        alertify.supplier(fa('plus', 'Add New Supplier'), renderTemplate(restaurantSupplierInsertTPL)).maximize();
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.Suppliers.findOne(this._id);
        alertify.supplier(fa('pencil', 'Update Existing Supplier'), renderTemplate(restaurantSupplierUpdateTPL, data)).maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        var canRemove = (this._purchaseCount == null || this._purchaseCount == 0);
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    /*  var relation = relationExist(
                     [
                     {collection: Restaurant.Collection.Purchases, selector: {supplierId:id}}
                     ]
                     );*/
                    if (canRemove) {
                        Restaurant.Collection.Suppliers.remove(id, function (error) {
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
                title: '<i class="fa fa-remove"></i> Delete Supplier'
            });

    },
    'click .show': function (e, t) {
        alertify.supplierShow(fa('eye', 'Supplier Detail'), renderTemplate(restaurantSupplierShowTPL, this));
    }
});
AutoForm.hooks({
    restaurant_supplierInsert: {
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
        }
    },
    restaurant_supplierUpdate: {
        onSuccess: function (formType, result) {
            alertify.supplier().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
