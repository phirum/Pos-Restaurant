Restaurant.Collection.PromotionTotalAmounts = new Mongo.Collection("restaurant_promotionTotalAmounts");
Restaurant.Schema.PromotionTotalAmounts = new SimpleSchema({
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
    promotionItems: {
        type: Array,
        label: "PromotionItems",
        min:1
    },
    'promotionItems.$':{
        type:Object
    },
    'promotionItems.$.amount': {
        type: Number,
        label: "Amount"
    },
    'promotionItems.$.discount': {
        type: Number,
        label: "Discount(%)",
        decimal:true
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
Restaurant.Collection.PromotionTotalAmounts.attachSchema(Restaurant.Schema.PromotionTotalAmounts);
