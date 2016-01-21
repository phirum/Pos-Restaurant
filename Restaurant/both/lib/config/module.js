/**
 * Module
 */
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Restaurant = {
    name: 'POS Restaurant System',
    version: '0.0.1',
    summary: 'POS Restaurant System is used for Sale (Point of Sale) In the Restaurant.',
    roles: [
        'admin',
        'general',
        'reporter',
        'seller'
    ],
    dump: {
        setting: [
            'Restaurant.Collection.Categories',
            'Restaurant.Collection.Units',
            'Restaurant.Collection.Products'
        ],
        data: [
            'Restaurant.Collection.ExchangeRates',
            'Restaurant.Collection.Customers',
            'Restaurant.Collection.Suppliers',
            'Restaurant.Collection.Staffs',
            'Restaurant.Collection.UserStaffs',
            'Restaurant.Collection.Sales',
            'Restaurant.Collection.SaleDetails',
            'Restaurant.Collection.Purchases,',
            'Restaurant.Collection.PurchaseDetails',
            'Restaurant.Collection.Promotions',
            'Restaurant.Collection.PromotionPercentages',
            'Restaurant.Collection.PromotionQuantities',
            'Restaurant.Collection.Payments',
            'Restaurant.Collection.Locations',
            'Restaurant.Collection.LocationSettings',
            'Restaurant.Collection.LocationTransfers',
            'Restaurant.Collection.FIFOInventory'
        ]
    }
};
