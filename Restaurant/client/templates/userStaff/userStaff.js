var restaurantUserStaffTPL = Template.restaurant_userStaff;
var restaurantUserStaffInsertTPL = Template.restaurant_userStaffInsert;
var restaurantUserStaffUpdateTPL = Template.restaurant_userStaffUpdate;
var restaurantUserStaffShowTPL = Template.restaurant_userStaffShow;

restaurantUserStaffTPL.onRendered(function () {
    createNewAlertify(['userStaff', 'userStaffShow']);
});
restaurantUserStaffTPL.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')};
    }
});
restaurantUserStaffTPL.events({
    'click .insert': function (e, t) {
        alertify.userStaff(fa('plus', 'Add New User Staff Mapping'), renderTemplate(restaurantUserStaffInsertTPL)).maximize();
    },
    'click .update': function (e, t) {
        var data = Restaurant.Collection.UserStaffs.findOne(this._id);
        alertify.userStaff(fa('pencil', 'Update Existing User Staff Mapping'), renderTemplate(restaurantUserStaffUpdateTPL, data)).maximize();
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {
                    Restaurant.Collection.UserStaffs.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: '<i class="fa fa-remove"></i> Delete UserStaff'
            });

    },
    'click .show': function (e, t) {
        alertify.userStaffShow(fa('eye','User-Staff Detail'),renderTemplate(restaurantUserStaffShowTPL, this));
    }
});
restaurantUserStaffInsertTPL.helpers({
    userIds: function () {
        var list = [{label: "(Select One)", value: ""}];
        var branchId = Session.get('currentBranch');
        var userIds = Restaurant.Collection.UserStaffs.find().map(function (us) {
            return us.userId;
        });
        var user = Meteor.users.find({_id: {$not: {$in: userIds}}, username: {$ne: 'super'}});
        user.forEach(function (u) {
            u.rolesBranch.forEach(function (r) {
                if (r == branchId) {
                    list.push({label: u.username, value: u._id});
                    return false;
                }
            });
        });
        return list;
    }
});
restaurantUserStaffUpdateTPL.helpers({
    userIds: function () {
        var list = [{label: "(Select One)", value: ""}];
        var branchId = Session.get('currentBranch');
        var user = Meteor.users.find({username: {$ne: 'super'}});
        user.forEach(function (u) {
            u.rolesBranch.forEach(function (r) {
                if (r == branchId) {
                    list.push({label: u.username, value: u._id});
                    return false;
                }
            });
        });
        return list;
    }
});
AutoForm.hooks({
    // Customer
    restaurant_userStaffInsert: {
        before: {
            insert: function (doc) {
                var branchId = Session.get('currentBranch');
                doc.branchId = branchId;
                return doc;
            }
        },
        onSuccess: function (formType, result) {

            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    restaurant_userStaffUpdate: {
        onSuccess: function (formType, result) {
            alertify.userStaff().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
