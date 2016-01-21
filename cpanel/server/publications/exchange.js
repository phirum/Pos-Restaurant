/* Exchange */
Meteor.publish('cpanel_exchange', function () {
    this.unblock();
    if (this.userId) {
        return Cpanel.Collection.Exchange.find();
    }
    this.ready();
});

Meteor.publish('cpanel_exchangeById', function (id) {
    this.unblock();
    if (this.userId) {
        return Cpanel.Collection.Exchange.find({_id: id});
    }
    this.ready();
});
