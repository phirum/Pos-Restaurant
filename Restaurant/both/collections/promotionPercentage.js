Restaurant.Collection.PromotionPercentages = new Mongo.Collection("restaurant_promotionPercentages");
Restaurant.Schema.PromotionPercentages = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    },
    startDate: {
        type: Date,
        label: "Start Date"
    },
    endDate: {
        type: Date,
        label: "End Date"
    },
    startTime: {
        type: String,
        label: "Start Time"
    },
    endTime: {
        type: String,
        label: "End Time"
    },
    percentage: {
        type: Number,
        label: "Discount(%)",
        decimal: true
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    branchId: {
        type: String,
        label: "Branch"
    }
});
Restaurant.Collection.PromotionPercentages.attachSchema(Restaurant.Schema.PromotionPercentages);
