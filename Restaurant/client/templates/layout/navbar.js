Template.restaurant_navbar.helpers({
    'noSeller': function () {
        var t = true;
        var user = Meteor.users.findOne(Meteor.user()._id);
        var roles = user.roles["Restaurant"];
        roles.forEach(function (obj) {
            if (obj == "seller") {
                t = false;
                return false;
            }
        });
        return t;
    },
    isZero:function(val){
        debugger;
        return val==0;
    }
});


Template.restaurant_saleNotification.helpers({
    sevenDaysOwedSale:function(){
        var lastWeek = new Date();
        var a=lastWeek.setDate(lastWeek.getDate() - 7);
        var selector={
            status: 'Owed',
            saleDate: {$lte: lastWeek}
        };
        Meteor.subscribe('restaurantSale',selector);
        return Restaurant.Collection.Sales.find(selector);

    }
});