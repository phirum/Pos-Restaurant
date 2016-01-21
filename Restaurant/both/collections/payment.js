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
        }
    },
    supplierId: {
        type: String,
        label: "Supplier",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.supplierList();
            }
        }
    },
    saleId: {
        type: String,
        label: "SaleId",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.saleList()
            }
        }
    },
    purchaseId: {
        type: String,
        label: "PurchaseId",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.purchaseList()
            }
        }
    },
    paymentDate: {
        type: String,
        label: "Payment Date"
    },
    /*createdAt: {
     type: Date,
     label: "Created Date",
     autoValue: function () {
     if (this.isInsert)
     return new Date;
     },
     denyUpdate: true,
     optional: true
     },
     updatedAt: {
     type: Date,
     label: "Updated Date",
     autoValue: function () {
     return new Date();
     },
     optional: true
     },
     createdUserId: {
     type: String,
     label: "Created by",
     autoValue: function () {
     if (this.isInsert)
     return Meteor.user()._id;
     },
     denyUpdate: true,
     optional: true
     },
     updatedUserId: {
     type: String,
     label: "Updated by",
     autoValue: function () {
     return Meteor.user()._id;
     },
     optional: true
     }*/
});
//Restaurant.Collection.Payments.attachSchema(Restaurant.Schema.Payments);
