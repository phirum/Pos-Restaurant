Restaurant.Collection.Sales.cacheTimestamp();
Restaurant.Collection.Sales.cacheCount('paymentCount', Restaurant.Collection.Payments, 'saleId');
Restaurant.Collection.Sales.cacheCount('saleDetailCount', Restaurant.Collection.SaleDetails, 'saleId');
Restaurant.Collection.Sales.cacheDoc('table', Restaurant.Collection.Tables, ['name']);
Restaurant.Collection.Sales.cacheDoc('staff', Restaurant.Collection.Staffs, ['name']);
Restaurant.Collection.Sales.cacheDoc('exchangeRate', Restaurant.Collection.ExchangeRates, ['base', 'rates']);
Restaurant.Collection.Sales.cacheDoc('customer', Restaurant.Collection.Customers, ['name']);
//Restaurant.Collection.Sales.cacheDoc('branch', Cpanel.Collection.Branch, ['khName', 'enName']);
