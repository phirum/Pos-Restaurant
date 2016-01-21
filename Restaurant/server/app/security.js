/**
 * Admin
 */
Security.defineMethod("restaurantIsAdmin", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['admin'], 'Restaurant');
    }
});

/**
 * General
 */
Security.defineMethod("restaurantIsGeneral", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['general'], 'Restaurant');
    }
});

/**
 * Reporter
 */
Security.defineMethod("restaurantIsReporter", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['reporter'], 'Restaurant');
    }
});

/**
 * Seller
 */
Security.defineMethod("restaurantIsSeller", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['seller'], 'Restaurant');
    }
});
