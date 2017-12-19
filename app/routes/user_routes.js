const ObjectID = require('mongodb').ObjectID,
    errorMessage = 'An error has occurred',
    PAGE_SIZE = 2;

module.exports = function (app, db) {

    // Get User
    app.get("/users/:id", (req, res) => {
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
    app.get("/getUsers/:pageNumber", (req, res) => {
        const pageNumber = req.params.pageNumber,
            skips = PAGE_SIZE * (pageNumber - 1);
        var totalCount;
        db.collection('users').count((err, count) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                totalCount = count;
            }
        });
        db.collection('users').find().skip(skips).limit(PAGE_SIZE).toArray(function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({users: result, totalCount: totalCount, totalPages: Math.round(totalCount / PAGE_SIZE)});
            }
        });
    });

    // Create User
    app.post("/users", (req, res) => {
        const userBody = req.body,
        user = {
            name: userBody.name,
            email: userBody.email,
            city: userBody.city,
            country: userBody.country,
            phone: userBody.phone
        };

        db.collection('users').findOne({ 'email': user.email }, (err, item) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {
                if(item){
                    res.send({error: 'User already exists'});
                }
                else{
                    db.collection('users').insertOne(user, (err, result) => {
                        if (err) {
                            res.send({ 'error': errorMessage });
                        } else {
                            res.send(result.ops[0]);
                        }
                    });
                }   
            }
        });      
    });

    // Delete User
    app.delete("/users/:id", (req, res) => {
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
    app.put("/users/:id", (req, res) => {
        const userBody = req.body,
            id = req.params.id,
            details = { '_id': new ObjectID(id) },
            user = {
                city: userBody.city,
                country: userBody.country,
                phone: userBody.phone
            };
        db.collection('users').findOneAndUpdate(details, {$set: user}, (err, result) => {
            if (err) {
                res.send({ 'error': errorMessage });
            } else {                
                res.send(user);
            }
        });
    });
};