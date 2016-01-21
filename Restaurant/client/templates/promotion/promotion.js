/**
 * Create new custom  alertify
 */

Template.restaurant_promotion.onRendered(function () {
    createNewAlertify("promotion");
});
/**
 * Index
 */
Template.restaurant_promotion.events({
    'click .insert': function (e, t) {

        alertify.promotion(renderTemplate(Template.restaurant_promotionInsert))
            .set({
                title: "<i class='fa fa-plus'></i>Add New Promotion"
            })
            .maximize();

    },
    'click .update': function (e, t) {

        var data = Restaurant.Collection.Promotions.findOne(this._id);

        alertify.promotion(renderTemplate(Template.restaurant_promotionUpdate, data))
            .set({
                title: '<i class="fa fa-pencil"></i> Update Existing Promotion'
            })
            .maximize();

    },
    'click .remove': function (e, t) {

        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    var relation = relationExist(
                        [
                            {collection: Restaurant.Collection.SubPromotions, selector: {promotionId: id}}
                        ]
                    );
                    if (relation) {
                        alertify.alert("Data has been used. Can't remove.").set({title: "Data has been used."});
                    } else {
                        Restaurant.Collection.Promotions.remove(id, function (error) {
                            if (error) {
                                alertify.error(error.message);
                            } else {
                                alertify.success("Success");
                            }
                        });
                    }
                },
                title: '<i class="fa fa-remove"></i> Delete Promotion'
            });

    },
    'click .show': function (e, t) {

        alertify.alert(renderTemplate(Template.restaurant_promotionShow, this))
            .set({
                title: '<i class="fa fa-eye"></i> Promotion Detail'
            });

    }
});

/**
 * Insert
 */
Template.restaurant_promotionInsert.onRendered(function () {
    DateTimePicker.date($('[name="startDate"]'));
    DateTimePicker.date($('[name="endDate"]'));
    $('[name="startDate"]').on("dp.change", function (e) {
        $('[name="endDate"]').data("DateTimePicker").minDate(e.date);
    });
    $('[name="endDate"]').on("dp.change", function (e) {
        $('[name="startDate"]').data("DateTimePicker").maxDate(e.date);
    });
    // datePicker();
});

Template.restaurant_promotionInsert.events({});

/**
 * Update
 */
Template.restaurant_promotionUpdate.onRendered(function () {
    // datePicker();
});

Template.restaurant_promotionUpdate.events({});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    restaurant_promotionInsert: {
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    restaurant_promotionUpdate: {
        onSuccess: function (formType, result) {
            alertify.promotion().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

/**
 * Config date picker
 */
var datePicker = function () {
    var dob = $('[name="dob"]');
    DateTimePicker.date(dob);
};
