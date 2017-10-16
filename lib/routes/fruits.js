const mongodb = require('../mongodb');
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
    },

    GET(req, res) {
        const fruits = mongodb.db.collection('fruits');
        const  id = req.requested.params.id;

        if(!id) {
            fruits.find().toArray()
                .then(fruits => {
                    res.end(JSON.stringify(fruits));
                });
            return;
        }

        fruits.findOne( { _id: ObjectID(id) })
            .then(fruit => {
                if(!fruit) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({
                        error: `id ${id} does not exist`
                    }));
                    return;
                }
                res.end(JSON.stringify(fruit));
            })
            .catch(err => errorHandler(err, req, res));
    },

    DELETE(req, res) {
        const id = req.requested.params.id;

        if(!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'DELETE called with no id'
            }));
            return;
        }

        const fruits = mongodb.db.collection('fruits');
        fruits.removeOne( { _id: ObjectID(id) })
            .then( result => {
                const status = {
                    removed: result.deletedCount === 1
                };
                res.end(JSON.stringify(status));
            })
            .catch(err => errorHandler(err, req, res));
    }
};
module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const subRoute = methods[req.method] || notFound;
    subRoute(req, res);
};