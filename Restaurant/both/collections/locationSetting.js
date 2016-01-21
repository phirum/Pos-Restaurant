Restaurant.Collection.LocationSettings = new Mongo.Collection("restaurant_locationSettings");
Restaurant.Schema.LocationSettings = new SimpleSchema({
    saleLocationId: {
        type: String,
        label: "Location for Sale",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.locations();
            }
        }
    },
    branchId: {
        type: String,
        label: "Branch"
    }
    /*createdAt: {
        type: Date,
        label: "Created Date",
        autoValue: function () {
            if (this.isInsert)
                return new Date;
        },
        denyUpdate: true,
        optional: true
    },
    updatedAt: {
        type: Date,
        label: "Updated Date",
        autoValue: function () {
            return new Date();
        },
        optional: true
    },
    createdUserId: {
        type: String,
        label: "Created by",
        autoValue: function () {
            if (this.isInsert)
                return Meteor.user()._id;
        },
        denyUpdate: true,
        optional: true
    },
    updatedUserId: {
        type: String,
        label: "Updated by",
        autoValue: function () {
            return Meteor.user()._id;
        },
        optional: true
    }*/
});
Restaurant.Collection.LocationSettings.attachSchema(Restaurant.Schema.LocationSettings);
