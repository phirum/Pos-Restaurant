Restaurant.TabularTable.LocationSettings = new Tabular.Table({
    name: "restaurantLocationSettingList",
    collection: Restaurant.Collection.LocationSettings,
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.restaurant_locationSettingAction
        },
        {data: "_id", title: "ID"},
        {data: "_location.name", title: "Location"}

    ],
    order: [['1', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
