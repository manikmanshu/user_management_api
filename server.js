const express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    bodyParser = require('body-parser'),
    app = express(),
    db = require('./config/db'),
    port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    // DB 'myProject' is created already
    require('./app/routes')(app, database.db('myProject'));
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});