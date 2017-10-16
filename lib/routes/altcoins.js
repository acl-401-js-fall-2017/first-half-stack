const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const notFound = require('../utils/not-found');
const errorHandler = require('../utils/error-handler');

const methods = {
    POST(req, res) {
        const altcoins = mongodb.db.collections();
        altcoins.insert(req.body)
            .then(result => {
                const altcoin = result.ops[0];
                res.end(JSON.stringify(altcoin));
            })
            .catch(err => errorHandler(err, req, res));
    }
};

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const subRoute = methods[req.method] || notFound;
    subRoute(req, res);
};