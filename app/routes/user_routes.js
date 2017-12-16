var ObjectID = require('mongodb').ObjectID,
    routeUrls = require('./routeUrls');
const errorMessage = 'An error has occurred';

const PAGE_SIZE = 2;

module.exports = function (app, db) {

    function createUserObject(user) {
        return {
            name: user.name,
            email: user.email,
            city: user.city,
            country: user.country,
            phone: user.phone
        };
    }
    // Get User
    app.get(routeUrls.userFetchUpdateDeleteUrl, (req, res) => {
        const id = req.params.id,
            details = { '_id': new ObjectID(id) };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                res.send(item);
            }
        });
    });

    // Get Users with pagination
    app.get(routeUrls.userFetchallUrl, (req, res) => {
        const pageNumber = req.params.pageNumber,
            skips = PAGE_SIZE * (pageNumber - 1);
        var users = db.collection('users').find().skip(skips).limit(PAGE_SIZE).toArray(function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('userList.ejs', { users: result });
            }
        });
    });

    // Create User
    app.post(routeUrls.userCreateUrl, (req, res) => {
        let userBody = req.body;
        const user = createUserObject(userBody);
        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    // Delete User
    app.delete(routeUrls.userFetchUpdateDeleteUrl, (req, res) => {
        const id = req.params.id,
            details = { '_id': new ObjectID(id) };
        db.collection('users').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                res.send('User ' + id + ' deleted!');
            }
        });
    });

    // Update User
    app.put(routeUrls.userFetchUpdateDeleteUrl, (req, res) => {
        const userBody = req.body,
            id = req.params.id,
            details = { '_id': new ObjectID(id) },
            user = createUserObject(userBody);
        db.collection('users').update(details, user, (err, result) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                res.send(user);
            }
        });
    });
};