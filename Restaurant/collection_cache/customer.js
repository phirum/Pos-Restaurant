Restaurant.Collection.Customers.cacheTimestamp();
Restaurant.Collection.Customers.cacheCount('saleCount', Restaurant.Collection.Sales, 'customerId');
Restaurant.Collection.Customers.cacheDoc('branch',Cpanel.Collection.Branch,['khName','enName']);