Restaurant.Collection.Payments = new Mongo.Collection("restaurant_payments");
Restaurant.Schema.Payments = new SimpleSchema({
    customerId: {
        type: String,
        label: "Customer",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.customerList();
            }
        },
        optional:true
    },
    saleId: {
        type: String,
        label: "SaleId"
       /* autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.saleList()
            }
        }*/
    },
    paymentDate: {
        type: String,
        label: "Payment Date"
    },
    payAmount:{
        type:Number,
        label:"Pay Amount",
        decimal:true
    },
    dueAmount:{
        type:Number,
        label:"Due Amount",
        decimal:true
    },
    balanceAmount:{
        type:Number,
        label:"Balance Amount"
    },
    branchId:{
        type:String,
        label:"Branch"
    },
    status:{
        type:String,
        label:"Status"
    },
    payments:{
        type:[Object],
        label:"Payments",
        blackbox:true
    }
});
Restaurant.Collection.Payments.attachSchema(Restaurant.Schema.Payments);
