Restaurant.Collection.SaleDetails = new Mongo.Collection("restaurant_saleDetails");

Restaurant.Schema.SaleDetails = new SimpleSchema({
    saleId: {
        type: String,
        label: "Sale"
    },
    productId: {
        type: String,
        label: "Product"
    },
    price: {
        type: Number,
        label: "Price",
        decimal: true
    },
    discount: {
        type: Number,
        label: "Discount",
        decimal: true
    },
    quantity: {
        type: Number,
        label: "Quantity"
    },
    amount: {
        type: Number,
        label: "Amount",
        decimal: true
    },
    status:{
        type:String,
        label:"Status"
    },
    note:{
        type:String,
        label:"Note",
        optional:true
    },
    branchId:{
        type:String,
        label:"Branch"
    }
});
Restaurant.Collection.SaleDetails.attachSchema(Restaurant.Schema.SaleDetails);

