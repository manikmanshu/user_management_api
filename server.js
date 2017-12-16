const express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    bodyParser = require('body-parser'),
    app = express(),
    db = require('./config/db'),
    port = 8000,

    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),

    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    path = require('path');

// configuration 
mongoose.connect(db.url, {// connect to database
    useMongoClient: true
  }); 

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static(path.join(__dirname, 'public')));

// set up express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'usermanagement', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    // DB 'myProject' is created already
    require('./app/routes')(app, database.db('myProject'), passport);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});