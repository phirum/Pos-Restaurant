/*
 Restaurant.Collection.Customers.permit(['insert', 'update', 'remove'])
 .restaurantIsGeneral()
 .apply();
 */

Security.permit(['insert', 'update', 'remove']).collections([
    Restaurant.Collection.Categories,
    Restaurant.Collection.SubCategories,
    Restaurant.Collection.Units,
    Restaurant.Collection.Staffs,
    Restaurant.Collection.Customers,
    Restaurant.Collection.Suppliers,
    Restaurant.Collection.Products,
    Restaurant.Collection.Sales,
    Restaurant.Collection.SaleDetails,
    Restaurant.Collection.Payments,
    Restaurant.Collection.Purchases,
    Restaurant.Collection.PurchaseDetails,
    Restaurant.Collection.Stocks,
    Restaurant.Collection.ExchangeRates,
    Restaurant.Collection.StockHistories,
    Restaurant.Collection.UserStaffs,
    Restaurant.Collection.Adjustments,
    Restaurant.Collection.AdjustmentDetails,
    Restaurant.Collection.PromotionPercentages,
    Restaurant.Collection.PromotionQuantities,
    Restaurant.Collection.PromotionTotalAmounts,
    Restaurant.Collection.FIFOInventory,
    Restaurant.Collection.LIFOInventory,
    Restaurant.Collection.AverageInventory,
    Restaurant.Collection.Locations,
    Restaurant.Collection.LocationSettings,
    Restaurant.Collection.LocationTransfers,
    Restaurant.Collection.LocationTransferDetails,
    Restaurant.Collection.TableLocations,
    Restaurant.Collection.Tables
]).restaurantIsAdmin().apply();

Security.permit(['insert', 'update', 'remove']).collections([
    Restaurant.Collection.Customers,
    Restaurant.Collection.Sales,
    Restaurant.Collection.SaleDetails,
    Restaurant.Collection.Payments,
    Restaurant.Collection.Stocks,
    Restaurant.Collection.FIFOInventory,
    Restaurant.Collection.LIFOInventory,
    Restaurant.Collection.AverageInventory
]).restaurantIsSeller().apply();


/*
 Restaurant.Collection.Purchases.allow({
 insert: function (userId, doc) {
 // the user must be logged in, and the document must be owned by the user
 //  return (userId && doc.owner === userId);
 return userId && Roles.userIsInRole(userId, ['general'], 'Restaurant');
 },
 update: function (userId, doc, fields, modifier) {
 // can only change your own documents
 //  return doc.owner === userId;
 return userId && Roles.userIsInRole(userId, ['general'], 'Restaurant');
 },
 remove: function (userId, doc) {
 // can only remove your own documents
 //  return doc.owner === userId;
 return userId && Roles.userIsInRole(userId, ['general'], 'Restaurant');
 }
 });
 Restaurant.Collection.PurchaseDetails.allow({
 insert: function (userId, doc) {
 return userId && Roles.userIsInRole(userId, ['general'], 'Restaurant');
 },
 update: function (userId, doc, fields, modifier) {
 return userId && Roles.userIsInRole(userId, ['general'], 'Restaurant');
 },
 remove: function (userId, doc) {
 return userId && Roles.userIsInRole(userId, ['general'], 'Restaurant');
 }
 });*/
/*Restaurant.Collection.Purchases.deny({
 insert: function (userId, doc) {
 return true;
 //  return userId && !Roles.userIsInRole(userId, ['seller'], 'Restaurant');
 },
 update: function (userId, doc, fields, modifier) {
 return true;
 // return userId && !Roles.userIsInRole(userId, ['seller'], 'Restaurant');
 },
 remove: function (userId, doc) {
 return true;
 // return userId && !Roles.userIsInRole(userId, ['seller'], 'Restaurant');
 }
 });

 Restaurant.Collection.PurchaseDetails.deny({
 insert: function (userId, doc) {
 return false;
 // console.log(userId);
 //  return userId && !Roles.userIsInRole(userId, ['seller'], 'Restaurant');
 },
 update: function (userId, doc, fields, modifier) {
 return true;
 //return userId && !Roles.userIsInRole(userId, ['seller'], 'Restaurant');
 },
 remove: function (userId, doc) {
 return true;
 //return userId && !Roles.userIsInRole(userId, ['seller'], 'Restaurant');
 }
 });
 */