var restaurantAddNoteTPL = Template.restaurant_addNote;

restaurantAddNoteTPL.events({
    'click #save-note': function () {
        //var id = 1;
        debugger;
        var note = $('#note').val();
        set = {note:note};
        Meteor.call('updateSaleDetails', this._id, set, function (er, re) {
            if (er) {alertify.error(er.message);}else{
                alertify.addNote().close();
            }

        });
    }
});
