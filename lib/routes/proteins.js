const mongodb = require('../mongodb');
const mongo = require('mongodb');
const bodyParser = require('../util/bodyParser');
const notFound = require('./notFound');
const extractId = require('../util/extractId');
const Router = require('express').Router;
const router = Router();

const collection = 'proteins';

router
    .get('/', function(req, res) {
        return mongodb.db.collection(collection)
            .find({})
            .toArray()
            .then( output => {
                if(output.length) res.send(JSON.stringify(output));
                else notFound(req, res);
            });

    })

    .get('/:id', function(req, res) {
        let {id} = req.params;
        if(id && id.length !== 24) {
            return notFound(null, res);
        }
        return mongodb.db.collection(collection)
            .find(id ? {'_id' : new mongo.ObjectId(id)} : {})
            .toArray()
            .then( output => {
                if(output.length) res.send(output);
                else notFound(req, res);
            });

    })

    .post('/', function(req, res) {

        return bodyParser(req)
            .then(body => {
                return mongodb.db.collection(collection)
                    .insert(body)
                    .then(mongoRes => {
                        res.send(mongoRes.ops);
                    });
            });
    })

    .delete('/:id', function(req, res) {
        let {id} = req.params;
        if(id.length !== 24) {
            return res.send({removed: false});
        }
        return mongodb.db.collection(collection)
            .remove({'_id': new mongo.ObjectId(id)})
            .then(() => res.send({removed: true}))
            .catch(() => res.send({removed: false}));
    })
    
    .put('/:id', function(req, res) {
        let {id} = req.params;
        if(id.length !== 24) {
            return notFound(res);
        }
        return bodyParser(req)
            .then(body => {
                return mongodb.db.collection(collection)
                    .updateOne({'_id': new mongo.ObjectId(id)}, {$set: body})
                    .then(monResponse => {
                        res.send(monResponse.ops);
                    });
            });
    });


module.exports = router;