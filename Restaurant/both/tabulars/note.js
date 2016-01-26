Restaurant.TabularTable.Notes = new Tabular.Table({
    name: "restaurantNoteList",
    collection: Restaurant.Collection.Notes,
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.restaurant_noteAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Note"}
        //{data: "description", title: "Description"},
    ],
    order: [['1', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});