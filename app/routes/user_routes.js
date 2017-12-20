const errorMessage = 'An error has occurred',
    PAGE_SIZE = 2,
    User = require('../models/user');

module.exports = function (app) {

    // Get User
    app.get("/users/:id", (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err)
                res.send({ 'error': errorMessage });
            res.send(user);
        });
    });

    // Get Users with pagination
    app.get("/getUsers/:pageNumber", (req, res) => {
        const pageNumber = req.params.pageNumber,
            skips = PAGE_SIZE * (pageNumber - 1);
        var totalCount;
        User.count({}, (err, count) => {
            if (err) 
                res.send({ 'error': errorMessage });
            else 
                totalCount = count;
        });
        User.find({}, {}, { skip: skips, limit: PAGE_SIZE }, (err, results) => {
            if (err) 
                res.send({ 'error': errorMessage });
            else 
                res.send({ users: results, totalCount: totalCount, totalPages: Math.round(totalCount / PAGE_SIZE) });
        });
    });

    // Create User
    app.post("/users", (req, res) => {
        const userBody = req.body;
        User.findOne({ 'email': userBody.email }, (err, item) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else if (item) {
                res.send({ error: 'User already exists' });
            }
            else {
                User.create(userBody, (err, result) => {
                    if (err) {
                        res.send({ 'error': errorMessage });
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });

    // Delete User
    app.delete("/users/:id", (req, res) => {
        User.findByIdAndRemove(req.params.id, (err, item) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                res.send('User ' + req.params.id + ' deleted!');
            }
        });
    });

    // Update User
    app.put("/users/:id", (req, res) => {
        const user = {
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone
        };
        User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, user) => {
            if (err)
                res.send({ 'error': errorMessage });
            res.send(user);
        });
    });
};