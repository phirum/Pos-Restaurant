Restaurant.Collection.Sales = new Mongo.Collection("restaurant_sales");
Restaurant.Schema.Sales = new SimpleSchema({
    saleDate: {
        type: Date,
        label: "Sale Date"
    },
    discount: {
        type: Number,
        label: "Discount",
        decimal:true
    },
    subTotal: {
        type: Number,
        label: "SubTotal",
        decimal:true
    },
    total: {
        type: Number,
        label: "Total",
        decimal:true
    },
    staffId: {
        type: String,
        label: "Staff"
        //regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    status: {
        type: String,
        label: "Status"
    },
    customerId: {
        type: String,
        label: "Phone"
    },
    tableId: {
        type: String,
        label: "Table"
    },
    branchId:{
        type:String,
        label:"Branch"
    },
    exchangeRateId:{
        type:String,
        label:"Exchange Rate"
    },
    owedAmount:{
        type:Number,
        label: "Owed Amount",
        optional:true
    }

});
Restaurant.Collection.Sales.attachSchema(Restaurant.Schema.Sales);

