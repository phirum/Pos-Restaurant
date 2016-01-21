var restaurantCategoryTPL=Template.restaurant_category;
var restaurantCategoryInsertTPL=Template.restaurant_categoryInsert;
var restaurantCategoryUpdateTPL=Template.restaurant_categoryUpdate;
var restaurantCategoryShowTPL=Template.restaurant_categoryShow;
restaurantCategoryTPL.onRendered(function () {
    createNewAlertify(['category','categoryShow']);
});
restaurantCategoryTPL.events({
    'click .insert': function (e, t) {
        Session.set('CategoryIdSession', null);
        alertify.category(fa('plus','Add New Category'),renderTemplate(restaurantCategoryInsertTPL)).maximize();
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.Categories.findOne(this._id);
        Session.set('CategoryIdSession', this._id);
        alertify.category(fa('pencil','Update Existing Category'),renderTemplate(restaurantCategoryUpdateTPL, data))
            .maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        var canRemove =(this._categoryCount == null || this._categoryCount == 0)
            && (this._productCount == null || this._productCount == 0);
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    /* var relation = relationExist(
                     [
                     {collection: Restaurant.Collection.Products, selector: {categoryId: id}},
                     {collection: Restaurant.Collection.Categories, selector: {parentId: id}}
                     ]
                     );
                     if (relation) {
                     alertify.alert("Data has been used. Can't remove.").set({title: "Data has been used."});
                     } */
                    if (canRemove) {
                        Restaurant.Collection.Categories.remove(id, function (error) {
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
                title: '<i class="fa fa-remove"></i> Delete Category'
            });
    },
    'click .show': function (e, t) {
        alertify.categoryShow(fa('eye','Category Detail'),renderTemplate(restaurantCategoryShowTPL,this));
    }
});
AutoForm.hooks({
    // Customer
    restaurant_categoryInsert: {
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    restaurant_categoryUpdate: {
        /*before:{
         update:function(doc){
         debugger;
         if(this.docId==doc.parentId){
         alertify.warning("Parent can't be the same as the own category.");
         return;
         }
         return doc;
         }
         },*/
        onSuccess: function (formType, result) {
            alertify.category().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
