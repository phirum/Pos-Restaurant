var restaurantNoteTPL=Template.restaurant_note;
var restaurantNoteInsertTPL=Template.restaurant_noteInsert;
var restaurantNoteUpdateTPL=Template.restaurant_noteUpdate;
var restaurantNoteShowTPL=Template.restaurant_noteShow;

restaurantNoteTPL.onRendered(function(){
    createNewAlertify(['note','noteShow']);
});
restaurantNoteTPL.events({
    'click .insert': function (e, t) {
        alertify.note(fa('plus','Add New Note'),renderTemplate(restaurantNoteInsertTPL)).maximize();
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.Notes.findOne(this._id);
        alertify.note(fa('pencil','Update Existing Note'),renderTemplate(restaurantNoteUpdateTPL, data)).maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        var canRemove =(this._productCount == null || this._productCount == 0);
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                   /* var relation = relationExist(
                        [
                            {collection: Restaurant.Collection.Products, selector: {noteId:id}}
                        ]
                    );*/
                    if(canRemove){
                        Restaurant.Collection.Notes.remove(id, function (error) {
                            if (error) {
                                alertify.error(error.message);
                            } else {
                                alertify.success("Success");
                            }
                        });
                    }else {
                        alertify.warning("Data has been used. Can't remove.");
                    }
                },
                title: '<i class="fa fa-remove"></i> Delete Note'
            });
    },
    'click .show': function (e, t) {
        alertify.noteShow(fa('eye','Note Detail'),renderTemplate(restaurantNoteShowTPL, this))
    }
});
AutoForm.hooks({
    // Customer
    restaurant_noteInsert: {
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    restaurant_noteUpdate: {
        onSuccess: function (formType, result) {
            alertify.note().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

