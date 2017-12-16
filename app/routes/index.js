const loginRoutes = require('./login_routes'),
    userRoutes = require('./user_routes');
module.exports = function (app, db, passport) {
    // for login and authentication
    loginRoutes(app, passport);

    // user api rotes
    userRoutes(app, db);
    // Other route groups could go here, in the future
};