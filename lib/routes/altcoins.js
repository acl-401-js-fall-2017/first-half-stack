const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const notFound = require('../utils/not-found');
const errorHandler = require('../utils/error-handler');

const methods = {
    POST(req, res) {
        const altcoins = mongodb.db.collections('crews');
    }
}