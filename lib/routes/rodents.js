const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const notFound = require('../utils/not-found');
const errorHandler = require('../utils/error-handler');

const methods = {
    POST(req,res) {
        const rodents = mongodb.db.collection('treeRats-test');
        rodents.insert(req.body)
            .then(result => {
                const savedObj = result.ops[0];
                res.end(JSON.stringify(savedObj)); 
            })
            .catch(err => errorHandler(err, req, res));
    }
};

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const subRoute = methods[req.method] || notFound;
    subRoute(req, res);
};