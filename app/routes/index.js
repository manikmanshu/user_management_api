const loginRoutes = require('./login_routes'),
    userRoutes = require('./user_routes');
module.exports = function (app, passport) {
    // for login and authentication
    loginRoutes(app, passport);

    // user api rotes
    userRoutes(app);
    // Other route groups could go here, in the future
};