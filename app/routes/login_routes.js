var routeUrls = require('./routeUrls');

module.exports = function (app, passport) {

    // show the home page
    app.get(routeUrls.home, function (req, res) {
        res.render('index.ejs');
    });

    // show profile page
    app.get(routeUrls.profile, isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    // on user log out
    app.get(routeUrls.logout, function (req, res) {
        req.logout();
        res.redirect(routeUrls.home);
    });

    // show the login form
    app.get(routeUrls.login, function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post(routeUrls.login, passport.authenticate('local-login', {
        successRedirect: routeUrls.profile,
        failureRedirect: routeUrls.login, 
        failureFlash: true // allow flash messages
    }));

    // show the signup form
    app.get(routeUrls.signup, function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post(routeUrls.signup, passport.authenticate('local-signup', {
        successRedirect: routeUrls.profile, 
        failureRedirect: routeUrls.signup, 
        failureFlash: true // allow flash messages
    }));

    // Redirect to Google login
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // Redirect after Google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect(routeUrls.home);
}