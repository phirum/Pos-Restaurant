Restaurant.Collection.TableLocations = new Mongo.Collection("restaurant_tableLocations");
Restaurant.Schema.TableLocations = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    branchId:{
        type:String,
        label:"Branch"
    }
});
Restaurant.Collection.TableLocations.attachSchema(Restaurant.Schema.TableLocations);
