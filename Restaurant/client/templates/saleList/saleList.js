var restaurantSaleListTPL = Template.restaurant_saleList;
var restaurantSaleShow = Template.restaurant_saleShow;


restaurantSaleListTPL.onRendered(function () {
    createNewAlertify(['saleShow'],{size:'lg'});
});

restaurantSaleListTPL.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')}
    }
});

restaurantSaleListTPL.events({
    'click .insert': function (e, t) {
        FlowRouter.go('restaurant.checkout');
    },
    'click .update': function (e, t) {
        FlowRouter.go('restaurant.checkout', {saleId: this._id});
    },
    'click .remove': function (e, t) {
        var id = this._id;
        var canRemove = (this._paymentCount == null || this._paymentCount == 0);
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    /*  var relation = relationExist(
                     [
                     {collection: Restaurant.Collection.Payments, selector: {saleId: id}}
                     ]
                     );*/
                    if (canRemove) {
                        Restaurant.Collection.Sales.remove(id, function (error) {
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
                title: '<i class="fa fa-remove"></i> Delete Sale'
            });

    },
    'click .show': function (e, t) {
        //var sale=Restaurant.Collection.Sales.findOne(this._id);
        this.sDate = moment(this.saleDate).format("YYYY-MM-DD HH:mm:ss");
        this.saleDetails = Restaurant.Collection.SaleDetails.find({saleId: this._id});
        this.retail = this.isRetail ? "Retail" : "Wholesale";

        alertify.saleShow(fa('eye', 'Sale Detail'), renderTemplate(restaurantSaleShow, this));

    }
});
