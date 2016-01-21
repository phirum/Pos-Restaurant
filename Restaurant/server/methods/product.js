Meteor.methods({
    updateProduct: function (id, set) {
        Restaurant.Collection.Products.update(id, {$set: set});
    },
    directUpdateProduct:function(id,set,unset){
        var updateObject={};
        if(set!=null) updateObject.$set=set;
        if(unset!=null) updateObject.$unset=unset;
        Restaurant.Collection.Products.direct.update(id,updateObject);
    }
});