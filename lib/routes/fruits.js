const mongodb = require('../mongodb');
// eslint-disable-next-line
const ObjectID = require('mongodb').ObjectID;
const notFound = require('../utils/not-found');
const errorHandler = require('../utils/error-handler');

const methods = {
    POST(req, res) {
        const fruits = mongodb.db.collection('fruits');
        fruits.insert(req.body) 
            .then(results => {
                const fruit = results.ops[0];
                res.end(JSON.stringify(fruit));
            })
            .catch( err => errorHandler(err, req, res));
    }
};
module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const subRoute = methods[req.method] || notFound;
    subRoute(req, res);
};