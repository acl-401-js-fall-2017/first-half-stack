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
                    .then(mongoRes => {
                        res.end(JSON.stringify(mongoRes.ops));
                    });
            });
    }, 

    DELETE: function(req, res) {
        let id = extractId(req);
        if(id.length !== 24) {
            return res.end(JSON.stringify({removed: false}));
        }
        return mongodb.db.collection(collection)
            .remove({'_id': new mongo.ObjectId(id)})
            .then(() => res.end(JSON.stringify({removed: true})))
            .catch(() => res.end(JSON.stringify({removed: false})));
    }
};


module.exports = function(req, res) {
    errlog('proteins.js', 'req.method', req.method);
    methods[req.method](req, res);
    
};