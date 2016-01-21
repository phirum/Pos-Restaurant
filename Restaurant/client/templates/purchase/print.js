Template.restaurant_printPurchase.helpers({
    getFieldOfCurrency: function (id, field) {
        var currency = Cpanel.Collection.Currency.findOne(id);
        return currency[field];
    },
    multiply: function (val1, val2, id) {
        var value = (val1 * val2);
        if (id != null && id == "KHR") {
            value = roundRielCurrency(value);
            return numeral(value).format('0,0.00');
        }
        return numeral(value).format('0,0.00');
    },
    baseCurrency: function () {
        var id = Cpanel.Collection.Setting.findOne().baseCurrency;
        return Cpanel.Collection.Currency.findOne(id);
    },
    formatFixTwo: function (val) {
        return numeral(val).format('0,0.00');
    },
    data:function(){
        var purchaseId=FlowRouter.getParam('purchaseId');
        var callId = 'saleInvoice'+purchaseId;
        var call = Meteor.callAsync(callId, 'getPurchaseInvoiceData', purchaseId);
        if (!call.ready()) {
            return false;
        }
        return call.result();
    }

});
Template.restaurant_printPurchase.onRendered(
    /*function () {
     setTimeout(function () {
     window.print();
     window.close();
     }, 900);
     }*/
);
/*
Template.restaurant_printPurchase.helpers({
    getFileOfCurrency: function (id, field) {
        var currency = Cpanel.Collection.Currency.findOne(id);
        return currency[field];
    },
    multiply: function (val1, val2, id) {
        var value = (val1 * val2);
        if (id != null && id == "KHR") {
            value = roundRielCurrency(value);
            return numeral(value).format('0,0.00');
        }
        return numeral(value).format('0,0.00');
    },
    baseCurrency: function () {
        var id = Cpanel.Collection.Setting.findOne().baseCurrency;
        return Cpanel.Collection.Currency.findOne(id);
    },
    exchangeRates: function () {
        var purchase = Restaurant.Collection.Purchases.findOne(FlowRouter.getParam('purchaseId'));
        if (purchase != null) {
            return Restaurant.Collection.ExchangeRates.findOne(purchase.exchangeRateId);
        } else {
            var id = Cpanel.Collection.Setting.findOne().baseCurrency;
            return Restaurant.Collection.ExchangeRates.findOne({
                base: id,
                branchId: Session.get('currentBranch')
            }, {sort: {_id: -1, createdAt: -1}});
        }
    },
    company: function () {
        return Cpanel.Collection.Company.findOne({}, {sort: {_id: -1}});
    },
    purchase: function () {
        var s = Restaurant.Collection.Purchases.findOne(FlowRouter.getParam('purchaseId'));
        s.purchaseDate = moment(s.purchaseDate).format("DD-MM-YYYY, HH:mm");
        s.subTotalFormatted = numeral(s.subTotal).format('0,0.00');
        s.totalFormatted = numeral(s.total).format('0,0.00');
        s.staff = Restaurant.Collection.Staffs.findOne(s.staffId).name;
        s.supplier = Restaurant.Collection.Suppliers.findOne(s.supplierId).name;
        return s;
    },
    purchaseDetails: function () {
        var purchaseDetailItems = [];
        var purchaseDetails = Restaurant.Collection.PurchaseDetails.find({purchaseId: FlowRouter.getParam('purchaseId')});
        var i = 1;
        purchaseDetails.forEach(function (pd) {
            // var item = _.extend(pd,{});
            /!*var product = Restaurant.Collection.Products.findOne(pd.productId);
             var unit = Restaurant.Collection.Units.findOne(product.unitId).name;
             pd.productName = product.name + "(" + unit + ")";*!/
            pd.amountFormated = numeral(pd.amount).format('0,0.00');
            // pd.order = pad(i, 2);
            pd.order = i;
            // pd.qtyPrint = pd.quantity - pd.qtyPrinted;
            i++;
            purchaseDetailItems.push(pd);
        });
        return purchaseDetailItems;
    },
    paymentObj: function () {
        return Restaurant.Collection.Payments.findOne({purchaseId: FlowRouter.getParam('purchaseId')}, {sort: {_id: 1}});
    },
    formatFixTwo: function (val) {
        return numeral(val).format('0,0.00');
    },
    hasPayment: function () {
        var p = Restaurant.Collection.Payments.findOne({purchaseId: FlowRouter.getParam('purchaseId')}, {sort: {_id: 1}});
        return p != null;
    }
});
Template.restaurant_printPurchase.onRendered(
    /!*function () {
     setTimeout(function () {
     window.print();
     window.close();
     }, 900);
     }*!/
);
*/
