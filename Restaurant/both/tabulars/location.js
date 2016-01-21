Restaurant.TabularTable.Locations = new Tabular.Table({
    name: "restaurantLocationList",
    collection: Restaurant.Collection.Locations,
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.restaurant_locationAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "abbreviation", title: "Abbreviation"},
        {data: "description", title: "Description"}
    ],
    order: [['1', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});