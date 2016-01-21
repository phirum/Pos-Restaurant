var restaurantTableViewTPL = Template.restaurant_tableView;

restaurantTableViewTPL.events({});
restaurantTableViewTPL.helpers({
    tableLocations: function () {
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.TableLocations', {}, {});
    },
    tables: function () {
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Tables', {tableLocationId: this._id}, {});
    }
});
