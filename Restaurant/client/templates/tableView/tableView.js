var restaurantTableViewTPL = Template.restaurant_tableView;

restaurantTableViewTPL.onRendered(function () {
    Session.setDefault('tableLocationId', null);
});

restaurantTableViewTPL.events({
    'click .tableLocation-name': function () {
        Session.set('tableLocationId', this._id);
    }
});
restaurantTableViewTPL.helpers({
    tableLocations: function () {
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.TableLocations', {}, {});
    },
    tables: function () {
        var tableLocationId = Session.get('tableLocationId');
        if (tableLocationId) {
            return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Tables', {tableLocationId: tableLocationId}, {});
        } else {
            return [];
        }
    }
});
