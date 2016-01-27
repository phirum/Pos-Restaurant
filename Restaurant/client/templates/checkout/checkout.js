Session.setDefault('unitSession', null);
var restaurantAddNoteTPL = Template.restaurant_addNote;
Template.restaurant_checkout.onRendered(function () {
    createNewAlertify(["customer", "userStaff", "addNote"]);
    $('#sale-date').datetimepicker({
        format: "MM/DD/YYYY hh:mm:ss A"
    });
    //$('#product-id').select2();
    $('#product-barcode').focus();
    setTimeout(function () {
        $('.select-two').select2();
        var s = Restaurant.Collection.Sales.findOne({
            _id: FlowRouter.getParam('saleId'),
            status: "Unsaved",
            branchId: Session.get('currentBranch')
        });
        if (s == null) {
            FlowRouter.go('restaurant.checkout');
            $('#product-barcode').focus();
        }
    }, 500);
});
Template.restaurant_checkout.helpers({
    isEmptyString: function (note) {
        return note == "" || note == null;
    },
    compareTableId: function (id) {
        var sale = Restaurant.Collection.Sales.findOne(FlowRouter.getParam('saleId'));
        var tableId = Session.get('tableIdSession');
        if (sale) {
            return id == sale.tableId;
        } else if (tableId) {
            return id == tableId;
        } else {
            return false;
        }

    },
    getFileOfCurrency: function (id, field) {
        var currency = Cpanel.Collection.Currency.findOne(id);
        return currency[field];
    },
    hasTotal: function (total) {
        return total != null;
    },
    multiply: function (val1, val2, id) {
        if (val1 != null && val2 != null) {
            var value = (val1 * val2);
            if (id != null && id == "KHR") {
                value = roundRielCurrency(value);
                return numeral(value).format('0,0.00');
            }
            return numeral(value).format('0,0.00');
        }
    },
    currencies: function () {
        var id = Cpanel.Collection.Setting.findOne().baseCurrency;
        return Cpanel.Collection.Currency.find({_id: {$ne: id}});
    },
    baseCurrency: function () {
        var setting = Cpanel.Collection.Setting.findOne();
        if (setting != null) {
            return Cpanel.Collection.Currency.findOne(setting.baseCurrency);
        } else {
            return {};
        }

    },
    exchangeRates: function () {
        var sale = Restaurant.Collection.Sales.findOne(FlowRouter.getParam('saleId'));
        if (sale != null) {
            return Restaurant.Collection.ExchangeRates.findOne(sale.exchangeRateId);
        } else {
            var id = "";
            var setting = Cpanel.Collection.Setting.findOne();
            if (setting != null) {
                id = setting.baseCurrency;
            }
            return Restaurant.Collection.ExchangeRates.findOne({
                base: id,
                branchId: Session.get('currentBranch')
            }, {sort: {_id: -1, createdAt: -1}});
        }

    },
    compareTwoValue: function (val1, val2) {
        return val1 == val2;
    },
    customers: function () {
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Customers', {}, {})
    },
    staffs: function () {
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Staffs', {}, {})
    },
    tables: function () {
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Tables', {}, {});
    },
    thatUnit: function (unitId) {
        return unitId == Session.get('unitSession');
    },
    categories: function () {
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Categories', {}, {});
    },
    units: function () {
        return ReactiveMethod.call('findRecords', 'Restaurant.Collection.Units', {}, {});
    },
    products: function () {
        var selector = {};
        selector.categoryId = this._id;
        var unitSession = Session.get('unitSession');
        if (unitSession) {
            selector.unitId = unitSession;
        }
        return ReactiveMethod.call('findProducts', selector, {});
    },
    sale: function () {
        var s = Restaurant.Collection.Sales.findOne(FlowRouter.getParam('saleId'));
        if (s != null) {
            s.saleDate = moment(s.saleDate).format("DD-MM-YY, hh:mm:ss a");
            s.subTotalFormatted = numeral(s.subTotal).format('0,0.00');
            s.totalFormatted = numeral(s.total).format('0,0.00');
            //s.discountFormatted = numeral(s.discount).format('0.00');
            //s.discountAmountFormatted = numeral(s.discountAmount).format('0.00');
            s.discount = numeral(s.discount).format('0.00');
            // s.discountAmount = numeral(s.discountAmount).format('0.00');
            return s;
        } else {
            return {};
        }
    },
    saleDetails: function () {
        var saleDetailItems = [];
        var sD = Restaurant.Collection.SaleDetails.find({saleId: FlowRouter.getParam('saleId')});
        if (sD.count() > 0) {
            var i = 1;
            sD.forEach(function (sd) {
                // var item = _.extend(sd,{});
                /*var product = Restaurant.Collection.Products.findOne(sd.productId);
                 var unit = Restaurant.Collection.Units.findOne(product.unitId).name;
                 sd.productName = product.name + "(" + unit + ")";*/
                sd.amountFormatted = numeral(sd.amount).format('0,0.00');
                //sd.order = pad(i, 2);
                sd.order = i;
                i++;
                saleDetailItems.push(sd);
            });
            return saleDetailItems;
        } else {
            return [];
        }
    },
    sales: function () {
        var id = FlowRouter.getParam('saleId');
        if (id != null || id != "") {
            return Restaurant.Collection.Sales.find({
                _id: {$ne: id},
                branchId: Session.get('currentBranch'),
                status: "Unsaved"
            });
        } else {
            return Restaurant.Collection.Sales.find({branchId: Session.get('currentBranch'), status: "Unsaved"})
        }
    }
});
Template.restaurant_checkout.events({
    'click .add-note': function () {
        alertify.addNote(fa('pencil', 'Note'), renderTemplate(restaurantAddNoteTPL, this));
    },
    'change #table-id': function (e) {
        var saleId = $('#sale-id').val();
        if (saleId == "") return;
        var tableId = $(e.currentTarget).val();
        var set = {};
        set.tableId = tableId;
        Meteor.call('directUpdateSale', saleId, set, function (er, re) {
            if (er) alertify.error(er.message);
        });
    },
    'change #customer-id': function (e) {
        var saleId = $('#sale-id').val();
        if (saleId == "") return;
        var customerId = $(e.currentTarget).val();
        var set = {customerId: customerId};
        Meteor.call('directUpdateSale', saleId, set, function (er, re) {
            if (er) alertify.error(er.message);
        });
    },
    'change #staff-id': function (e) {
        var saleId = $('#sale-id').val();
        if (saleId == "") return;
        var staffId = $(e.currentTarget).val();
        var set = {staffId: staffId};
        Meteor.call('directUpdateSale', saleId, set, function (er, re) {
            if (er) alertify.error(er.message);
        });
    },
    'click .unit': function () {
        Session.set('unitSession', this._id);
    },
    'click #cancel-sale': function () {
        var saleId = $('#sale-id').val();
        if (saleId == "") return;
        alertify.confirm("Are you sure to cancel this order?")
            .set({
                onok: function (closeEvent) {
                    Meteor.call('cancelSale', saleId, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success('Sale is cancelled.');
                        }
                    });
                    FlowRouter.go('restaurant.checkout');
                    // prepareForm();
                },
                title: "Cancel Sale."
            });
    },
    'click #print-invoice': function () {
        var saleId = $('#sale-id').val();
        if (saleId == "") return;
        var url = $('#btn-print').attr('href');
        window.open(url, '_blank');
        prepareForm();
    },
    'click #suspend': function () {
        FlowRouter.go('restaurant.checkout');
        //prepareForm();
    },
    'click .btn-minus': function (e) {
        var quantity = this.quantity - 1;
        var set = {};
        set.quantity = quantity;
        set.amount = (this.price * set.quantity) * (1 - this.discount / 100);
        Meteor.call('updateSaleDetails', this._id, set, function (er, re) {
            if (er) alertify.error(err.message);
        });
    },
    'click .btn-plus': function (e) {
        var quantity = this.quantity + 1;
        var set = {};
        set.quantity = quantity;
        set.amount = (this.price * set.quantity) * (1 - this.discount / 100);
        Meteor.call('updateSaleDetails', this._id, set, function (er, re) {
            if (er) alertify.error(err.message);
        });
    },
    'click .btn-remove': function () {
        Restaurant.Collection.SaleDetails.remove(this._id);
        var sd = Restaurant.Collection.SaleDetails.find({
            saleId: FlowRouter.getParam('saleId')
        });
        if (sd.count() == 0) {
            Restaurant.Collection.Sales.remove(FlowRouter.getParam('saleId'));
            FlowRouter.go('restaurant.checkout');
            // prepareForm();
        }
        /*else {
         updateSaleSubTotal(FlowRouter.getParam('saleId'));
         }*/
    },
    'change #total_discount': function (e) {
        var value = $(e.currentTarget).val();
        var numericReg = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;
        var saleId = $('#sale-id').val();
        if (saleId == "") return;
        var sale = Restaurant.Collection.Sales.findOne(saleId);
        var firstTotalDiscount = sale.discount == null ? 0 : sale.discount;
        var discount = parseFloat($(e.currentTarget).val());
        if (!numericReg.test(value) || $(e.currentTarget).val() == "" || discount < 0 || discount > 100) {
            $(e.currentTarget).val(firstTotalDiscount);
            $(e.currentTarget).focus();
            return;
        }
        var baseCurrencyId = Cpanel.Collection.Setting.findOne().baseCurrency;
        var total = sale.subTotal * (1 - discount / 100);
        //var discountAmount = sale.subTotal * discount / 100;
        if (baseCurrencyId == "KHR") {
            total = roundRielCurrency(total);
        }
        var set = {};
        set.discount = discount;
        set.total = total;
        Meteor.call('directUpdateSale', saleId, set, function (er, re) {
            if (er) alertify.error(er.message);
        });
    }
});

Template.restaurant_showProduct.events({
    'click .product-dev': function () {
        var id = this._id;
        var selector = {_id: id};
        var data = getValidatedValues();
        if (data.valid) {
            checkBeforeAddOrUpdate(selector, data);
        } else {
            alertify.warning(data.message);
        }
        // $('#product-barcode').focus();
    }
});


function getValidatedValues() {
    var data = {};
    var id = Cpanel.Collection.Setting.findOne().baseCurrency;
    var exchangeRate = Restaurant.Collection.ExchangeRates.findOne({
        base: id,
        branchId: Session.get('currentBranch')
    }, {sort: {_id: -1, createdAt: -1}});
    if (exchangeRate == null) {
        data.valid = false;
        data.message = "Please input exchange rate for this branch.";
        return data;
    }
    /* var saleDate = $('#input-sale-date').val();
     if (saleDate == '') {
     data.valid = false;
     data.message = "Please input saleDate";
     return data;
     }*/
    var staffId = $('#staff-id').val();
    if (staffId == '' || staffId == null) {
        data.valid = false;
        data.message = "Please select staff name.";
        return data;
    }
    var tableId = $('#table-id').val();
    if (tableId == "" || tableId == null) {
        data.valid = false;
        data.message = "Please select table";
        return data;
    }

    var customerId = $('#customer-id').val();
    if (customerId == "" || customerId == null) {
        data.valid = false;
        data.message = "Please select customer name.";
        return data;
    }

    data.message = "Add product to list is successfully.";
    data.valid = true;
    data.saleObj = {
        saleDate: new Date(),
        tableId: tableId,
        staffId: staffId,
        customerId: customerId,
        exchangeRateId: exchangeRate._id
    };
    //data.product = product;
    return data;
}
function addOrUpdateProducts(branchId, saleId, product, saleObj) {
    // var defaultQuantity = $('#default-quantity').val() == "" ? 1 : parseInt($('#default-quantity').val());
    //var defaultDiscount = $('#default-discount').val() == "" ? 0 : parseFloat($('#default-discount').val());
    if (saleId == '') {
        // var exchange=parseFloat($('#last-exchange-rate').text());
        // var totalDiscount = $('#total_discount').val() == "" ? 0 : parseFloat($('#total_discount').val());
        saleObj.status = "Unsaved";
        saleObj.subTotal = 0;
        saleObj.discount = 0;
        saleObj.discountAmount = 0;
        saleObj.total = 0;
        saleObj.branchId = branchId;
        var saleDetailObj = {};
        saleDetailObj.productId = product._id;
        saleDetailObj.quantity = 1;
        saleDetailObj.discount = 0;
        saleDetailObj.price = product.price;
        //saleDetailObj.amount = (saleDetailObj.price * defaultQuantity) * (1 - defaultDiscount / 100);
        saleDetailObj.amount = saleDetailObj.price;
        saleDetailObj.branchId = branchId;
        saleDetailObj.status = "Unsaved";
        saleDetailObj.note = "";
        Meteor.call('insertSaleAndSaleDetail', saleObj, saleDetailObj, function (error, saleId) {
            if (saleId) {
                // $('#product-barcode').val('');
                // $('#product-barcode').focus();
                //$('#product-id').select2('val', '');
                FlowRouter.go('restaurant.checkout', {saleId: saleId});
            } else {
                alertify.error(error.message);
                $('#product-barcode').focus();
            }

        });
    }
    else {
        var saleDetail = Restaurant.Collection.SaleDetails.findOne({
            productId: product._id,
            saleId: saleId,
            isPromotion: {$ne: true}
        });
        if (saleDetail == null) {
            var saleDetailObj = {};
            saleDetailObj._id = idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, saleId, 3);
            saleDetailObj.saleId = saleId;
            saleDetailObj.quantity = 1;
            saleDetailObj.discount = 0;
            saleDetailObj.productId = product._id;
            saleDetailObj.price = product.price;
            //saleDetailObj.amount = (saleDetailObj.price * defaultQuantity) * (1 - defaultDiscount / 100);
            saleDetailObj.amount = saleDetailObj.price;
            saleDetailObj.branchId = branchId;
            saleDetailObj.status = "Unsaved";
            saleDetailObj.note = "";
            Meteor.call('insertSaleDetails', saleDetailObj, function (error, result) {
                if (error) alertify.error(error.message);
            });
        } else {
            var set = {};
            //need to checkout
            set.discount = 0;
            set.quantity = (saleDetail.quantity + 1);
            set.amount = saleDetail.price * set.quantity;
            //set.amount = (saleDetail.price * set.quantity) * (1 - defaultDiscount / 100);
            Meteor.call('updateSaleDetails', saleDetail._id, set, function (error, result) {
                if (error) alertify.error(error.message);
            });
        }
        // $('#product-barcode').val('');
        // $('#product-barcode').focus();
        // $('#product-id').select2('val', '');
        // updateSaleSubTotal(saleId);
    }
}
function checkBeforeAddOrUpdate(selector, data) {
    var saleId = $('#sale-id').val();
    var branchId = Session.get('currentBranch');
    Meteor.call('findOneRecord', 'Restaurant.Collection.Products', selector, {}, function (error, product) {
        //var defaultQuantity = $('#default-quantity').val() == "" ? 1 : parseInt($('#default-quantity').val());
        if (product) {
            /*if (product.productType == "Stock") {
             var saleDetails = Restaurant.Collection.SaleDetails.find({
             productId: product._id,
             saleId: saleId,
             locationId: locationId
             });
             if (saleDetails.count() > 0) {
             var saleDetailQty = 0;
             saleDetails.forEach(function (saleDetail) {
             saleDetailQty += saleDetail.quantity;
             });
             defaultQuantity = defaultQuantity + saleDetailQty;
             }
             debugger;
             //---Open Inventory type block "FIFO Inventory"---
             Meteor.call('findOneRecord', 'Restaurant.Collection.FIFOInventory', {
             branchId: branchId,
             productId: product._id,
             locationId: locationId
             }, {sort: {createdAt: -1}}, function (error, inventory) {
             if (inventory) {
             var remainQuantity = inventory.remainQty - defaultQuantity;
             if (remainQuantity < 0) {
             alertify.warning('Product is out of stock. Quantity in stock is "' + inventory.remainQty + '".');
             } else {
             var unSavedSaleId = Restaurant.Collection.Sales.find({
             status: "Unsaved",
             branchId: Session.get('currentBranch'),
             _id: {$ne: saleId}
             }).map(function (s) {
             return s._id;
             });
             var otherSaleDetails = Restaurant.Collection.SaleDetails.find({
             saleId: {$in: unSavedSaleId},
             productId: product._id,
             locationId: locationId
             });
             var otherQuantity = 0;
             if (otherSaleDetails.count() > 0) {
             otherSaleDetails.forEach(function (sd) {
             otherQuantity += sd.quantity;
             });
             }
             remainQuantity = remainQuantity - otherQuantity;
             if (remainQuantity < 0) {
             alertify.warning('Product is out of stock. Quantity in stock is "' +
             inventory.remainQty + '". And quantity on sale of other seller is "' + otherQuantity + '".');
             } else {
             addOrUpdateProducts(branchId, saleId, isRetail, product, data.saleObj);
             }
             }
             }
             else {
             alertify.warning("Don't have product in stock.");
             }
             });
             //---End Inventory type block "FIFO Inventory"---
             }
             else {*/
            addOrUpdateProducts(branchId, saleId, product, data.saleObj);
            /* }*/
        }
        else {
            alertify.warning("Can't find this Product");
        }
    });
}
function prepareForm() {
    Meteor.setTimeout(function () {
        //$('#input-sale-date').val('');
        //$('#voucher').val('');
        //$('#staff-id').select2();
        //$('#customer-id').select2();
        //$('#product-barcode').focus();
        //$('#product-id').select2('val', '');
    }, 200);
}
/*
 function checkoutStock(self, oldQty, newQty, e) {
 var saleId = $('#sale-id').val();
 var branchId = Session.get('currentBranch');
 var sdId = self._id;
 var locationId = $('#location-id').val();
 var set = {};
 set.quantity = newQty;
 set.amount = (self.price * newQty) * (1 - self.discount / 100);
 //var product = Pos.Collection.Products.findOne(productId);
 Meteor.call('findOneRecord', 'Pos.Collection.Products', {_id: self.productId}, {}, function (error, product) {
 if (product) {
 if (product.productType == "Stock") {
 //---Open Inventory type block "FIFO Inventory"---
 Meteor.call('findOneRecord', 'Pos.Collection.FIFOInventory', {
 branchId: branchId,
 productId: product._id,
 locationId: locationId
 }, {sort: {createdAt: -1}}, function (error, inventory) {
 if (inventory) {
 var remainQuantity = inventory.remainQty - newQty;
 var saleDetails = Pos.Collection.SaleDetails.find({
 _id: {$ne: self._id},
 productId: product._id,
 saleId: saleId,
 locationId: locationId
 });
 if (saleDetails.count() > 0) {
 var saleDetailQty = 0;
 saleDetails.forEach(function (saleDetail) {
 saleDetailQty += saleDetail.quantity;
 });
 remainQuantity = remainQuantity - saleDetailQty;
 }
 if (remainQuantity < 0) {
 alertify.warning('Product is out of stock. Quantity in stock is "' + inventory.remainQty + '".');
 $(e.currentTarget).val(oldQty);
 } else {
 var unSavedSaleId = Pos.Collection.Sales.find({
 status: "Unsaved",
 branchId: Session.get('currentBranch'),
 _id: {$ne: saleId}
 }).map(function (s) {
 return s._id;
 });
 var otherSaleDetails = Pos.Collection.SaleDetails.find({
 saleId: {$in: unSavedSaleId},
 productId: product._id
 });
 var otherQuantity = 0;
 if (otherSaleDetails != null) {
 otherSaleDetails.forEach(function (sd) {
 otherQuantity += sd.quantity;
 });
 }
 remainQuantity = remainQuantity - otherQuantity;
 if (remainQuantity < 0) {
 $(e.currentTarget).val(oldQty);
 alertify.warning('Product is out of stock. Quantity in stock is "' +
 inventory.remainQty + '". And quantity on sale of other seller is "' + otherQuantity + '".');

 } else {
 Meteor.call('updateSaleDetails', self._id, set);
 }
 }
 } else {
 alertify.warning("Don't have product in stock.");
 $(e.currentTarget).val(oldQty);
 }
 });
 } else {
 Meteor.call('updateSaleDetails', self._id, set);
 }
 }
 else {
 alertify.warning("Can't find this product.");
 $(e.currentTarget).val(oldQty);
 }
 });

 }*/
