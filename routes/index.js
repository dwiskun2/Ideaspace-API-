module.exports = {
    auth: require('./authRoutes'),
    products: require('./products'),
    categories: require('./category_products'),
    events:require('./user_events'),
    donations: require('./donations'),
    transactions:require('./transactions'),
    users:require('./users'),
    banks:require('./banks'),
    testimonies:require('./testimonies'),
    banners:require('./banners'),
    userUpdateData: require('./userUpdateProfile')
};
