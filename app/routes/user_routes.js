var ObjectID = require('mongodb').ObjectID;
const errorMessage = 'An error has occurred';

module.exports = function (app, db) {
    // Get User
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                res.send(item);
            }
        });
    });

    // Create User
    app.post('/users', (req, res) => {
        const user = { name: req.body.name, phone: req.body.phone };
        db.collection('users').insert(user, (err, result) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    // Delete User
    app.delete('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                res.send('User ' + id + ' deleted!');
            }
        });
    });

    // Update User
    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = { name: req.body.name, phone: req.body.phone };
        db.collection('users').update(details, user, (err, result) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                res.send(user);
            }
        });
    });
};