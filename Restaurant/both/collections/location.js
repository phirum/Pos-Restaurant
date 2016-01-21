Restaurant.Collection.Locations = new Mongo.Collection("restaurant_locations");
Restaurant.Schema.Locations = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        //unique: true,
        max: 200
    },
    abbreviation: {
        type: String,
        label: 'Abbreviation',
        optional: true
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
Restaurant.Collection.Locations.attachSchema(Restaurant.Schema.Locations);
