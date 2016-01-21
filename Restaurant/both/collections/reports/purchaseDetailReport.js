/**
 * Schema
 */
Restaurant.Schema.PurchaseDetailReport = new SimpleSchema({
    locationId: {
        type: String,
        label: "Location",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.ListForReport.locations();
            }
        },
        optional:true
    },
    categoryId: {
        type: String,
        label: "Category",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.category("All");
            }
        },
        optional:true
    },
    supplierId: {
        type: String,
        label: "Supplier",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.supplier();
            }
        },
        optional: true
    },
    date: {
        type: String,
        label: "Date"
    },

    staffId: {
        type: String,
        label: "Staff",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.staff();
            }
        },
        optional: true
    },
    branch: {
        type: String,
        label: "Branch",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.branchForUser();
            }
        },
        optional: true
    }
});