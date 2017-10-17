const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const notFound = require('../utils/not-found');
const errorHandler = require('../utils/error-handler');

const methods = {
    POST(req, res) {
        const altcoins = mongodb.db.collection('altcoins');
        altcoins.insert(req.body)
            .then(result => {
                const altcoin = result.ops[0];
                res.end(JSON.stringify(altcoin));
            })
            .catch(err => errorHandler(err, req, res));
    },
    GET(req, res) {
        const altcoins = mongodb.db.collection('altcoins');
        const id = req.requested.params.id;
        if(!id) {
            altcoins.find().toArray()
                .then(altcoins => {
                    res.end(JSON.stringify(altcoins));
                });
            return;
        }

        altcoins.findOne({ _id: ObjectID(id) })
            .then(altcoin => {
                if(!altcoin) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({
                        error: `id ${id} does not exist`
                    }));
                    return;
                }
                res.end(JSON.stringify(altcoin));
            })
            .catch(err => errorHandler(err, req, res));
    },
    DELETE(req, res) {
        const id = req.requested.params.id;
        if(!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'DELETE called without id'
            }));
            return;
        }

        const altcoins  = mongodb.db.collection('altcoins');
        altcoins.removeOne({ _id: ObjectID(id) })
            .then(result => {
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