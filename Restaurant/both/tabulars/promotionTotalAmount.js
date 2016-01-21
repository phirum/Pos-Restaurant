Restaurant.TabularTable.PromotionTotalAmounts = new Tabular.Table({
    name: "restaurantPromotionTotalAmountList",
    collection: Restaurant.Collection.PromotionTotalAmounts,
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.restaurant_promotionTotalAmountAction
        },
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {
            data: "startDate", title: "Start Date",
            render: function (val, type, doc) {
                return moment(val).format('MMMM DD, YYYY');
            }
        },
        {
            data: "endDate", title: "End Date",
            render: function (val, type, doc) {
                return moment(val).format('MMMM DD, YYYY');
            }
        },
        // {data: "purchasePrice", title: "Pur.Price"},
        // {data: "promotionItem", title: "Promotion Item"},
        {data: "startTime", title: "Start Time"},
        {data: "endTime", title: "End Time"},

        {data: "description", title: "Description"}
    ],
    extraFields:['promotionItems'],
    order: [['1', 'desc']],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});