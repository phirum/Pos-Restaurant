Restaurant.TabularTable.SubCategories = new Tabular.Table({
    name: "restaurantSubCategoryList",
    collection: Restaurant.Collection.SubCategories,
    columns: [
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {
            data: "categoryId", title: "Category",
            render: function (val, type, doc) {
                return Restaurant.Collection.Categories.findOne(val).name;
            }
        },
        {data: "description", title: "Description"},
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.restaurant_subCategoryAction
        }
    ],
    order: [['0', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 4}
    ]
});