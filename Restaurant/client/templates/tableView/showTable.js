var restaurantShowTableTPL = Template.restaurant_showTable;

restaurantShowTableTPL.onRendered(function () {
    //var height = $('windows').height();
    //$('.drag-obj-container').css('height', height);
    $('.drag-obj').draggable({
        cursor: "crosshair",
        containment: ".drag-obj-container",
        handle: '.drag-obj',
        stop: function (evt, ui) {
            var left = ui.position.left;
            var top = ui.position.top;
            Restaurant.Collection.Tables.update($(this).attr('id'), {$set: {left: left, top: top}});
        }
    });
    $('[data-toggle="popover"]').popover();
});

restaurantShowTableTPL.events({
    'click .add-invoice': function () {
        Session.set('tableIdSession', this._id);
        FlowRouter.go('/restaurant/checkout');
    }
});
restaurantShowTableTPL.helpers({
    sales: function () {
        return Restaurant.Collection.Sales.find({tableId: this._id});
    },
    hasSale: function (tableId) {
        var sale = Restaurant.Collection.Sales.findOne({tableId: tableId});
        return sale!=null;
    }
});
