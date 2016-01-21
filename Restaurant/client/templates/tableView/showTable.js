var restaurantShowTableTPL = Template.restaurant_showTable;

restaurantShowTableTPL.onRendered(function(){
    $('.drag-obj').draggable({
        handle:'.handle-drag',
        stop:function(evt,ui){
            var left = ui.position.left;
            var top = ui.position.top;
            Restaurant.Collection.Tables.update($(this).attr('id'),{$set:{left:left,top:top}});
        }
    });
});

restaurantShowTableTPL.events({

});
restaurantShowTableTPL.helpers({

});

