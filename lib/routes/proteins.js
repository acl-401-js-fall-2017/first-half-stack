const mongodb = require('../mongodb');
const mongo = require('mongodb');
const bodyParser = require('../util/bodyParser');
const notFound = require('./notFound');
const errlog = require('../../test/dev-util/errlog');
const extractId = require('../util/extractId');

const collection = 'proteins';

const methods = {
    GET: function(req, res) {
        let id = extractId(req);
        if(id && id.length !== 24) {
            return notFound(null, res);
        }
        return mongodb.db.collection(collection)
            .find(id ? {'_id' : new mongo.ObjectId(id)} : {})
            .toArray()
            .then( output => {
                if(output.length) res.end(JSON.stringify(output));
                else notFound(req, res);
            });

    },

    POST: function(req, res) {

        return bodyParser(req)
            .then(body => {
                return mongodb.db.collection(collection)
                    .insert(body)
                    .then(monRes => {
                        res.end(JSON.stringify(monRes.ops));
                    });
            });
    }
};


module.exports = function(req, res) {
    methods[req.method](req, res);
    
};