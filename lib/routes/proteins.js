const mongodb = require('../mongodb');
const bodyParser = require('../util/bodyParser.js');
const errlog = require('../../test/dev-util/errlog');

const collection = 'proteins';

const methods = {
    GET: function(req, res) {

        return mongodb.db.collection(collection)
            .find()
            .toArray()
            .then( output => res.end(JSON.stringify(output)));

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