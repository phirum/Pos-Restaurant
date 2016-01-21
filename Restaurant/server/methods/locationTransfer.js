Meteor.methods({
    //LocationTransfer
    insertLocationTransferAndLocationTransferDetail: function (locationTransfer, locationTransferDetail) {
        var todayDate = moment().format('YYYYMMDD');
        console.log(todayDate);
        var prefix = locationTransfer.branchId + "-" + todayDate;
        var locationTransferId= idGenerator.genWithPrefix(Restaurant.Collection.LocationTransfers, prefix, 4);
        locationTransfer._id=locationTransferId;
        Restaurant.Collection.LocationTransfers.insert(locationTransfer);
        locationTransferDetail.locationTransferId = locationTransferId;
        Restaurant.Collection.LocationTransferDetails.insert(locationTransferDetail);
        return locationTransferId;
    },
    insertLocationTransfer: function (obj) {
        return Restaurant.Collection.LocationTransfers.insert(obj);
    },
    directInsertLocationTransfer:function(obj){
        return Restaurant.Collection.LocationTransfers.direct.insert(obj);
    },
    directUpdateLocationTransfer:function(id,set){
        Restaurant.Collection.LocationTransfers.direct.update(id,{$set:set});
    },
    updateLocationTransfer: function (id, set) {
        Restaurant.Collection.LocationTransfers.update(id, {$set: set});
    },
    directInsertLocationTransferDetails:function(obj){
        Restaurant.Collection.LocationTransferDetails.direct.insert(obj);
    },
    insertLocationTransferDetails: function (obj) {
        Restaurant.Collection.LocationTransferDetails.insert(obj);
    },
    directUpdateLocationTransferDetails:function(id,set){
        Restaurant.Collection.LocationTransferDetails.direct.update(id,{$set:set});
    },
    updateLocationTransferDetails: function (id, set) {
        Restaurant.Collection.LocationTransferDetails.update(id, {$set: set});
    },
    cancelLocationTransfer: function (locationTransferId) {
        //Restaurant.Collection.LocationTransferDetails.remove({locationTransferId: locationTransferId});
        Restaurant.Collection.LocationTransfers.remove(locationTransferId);
    }

});