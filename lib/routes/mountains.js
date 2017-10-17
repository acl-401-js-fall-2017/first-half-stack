const Router = require('express').Router;
const router = Router();

const express = require('express');
const app = express();

const publicDir = './public';

app.use(express.static(publicDir));

const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const errorHandler = require('../utils/error-handler');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

router
    .get('/mountains/:id', (req, res) => {
        const mountains = mongodb.db.collection('mountains');
        const id = req.params.id;
        if (!id) {
            mountains.find().toArray()
                .then( (mountains) => {
                    res.send(mountains);
                });
            return;
        }
        mountains.findOne({ _id: ObjectID(id) })
            .then( mountain => {
                if (!mountain) {
                    res.statusCode = 404;
                    res.send({error: `id ${id} does not exist` });
                    return;
                }
                res.send(mountain);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .get('/mountains', (req, res) => {
        const mountains = mongodb.db.collection('mountains');
        const id = req.params.id;
        if (!id) {
            mountains.find().toArray()
                .then( (mountains) => {
                    res.send(mountains);
                });
            return;
        }
        mountains.findOne({ _id: ObjectID(id) })
            .then( mountain => {
                if (!mountain) {
                    res.statusCode = 404;
                    res.send({error: `id ${id} does not exist` });
                    return;
                }
                res.send(mountain);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .post('/mountains', (req, res) => {
        const mountains = mongodb.db.collection('mountains');
        mountains.insert(req.body)
            .then(result => {
                const mountain = result.ops[0];
                res.send(mountain);
            })
            .catch(err => errorHandler(err, req, res));
    })
    
    .put('/mountains/:id', (req, res) => {
        const mountains = mongodb.db.collection('mountains');
        const id = req.params.id;
        
        if (id.length != 24) {
            res.statusCode = 404;
            res.send({error: 'fail'});
            return;
        }

        mountains.update( { _id: ObjectID(id) } , {$set: req.body})
            .then( () => {
                return mountains.findOne({ _id: ObjectID(id) });
            })
            .then ((updated) => {
                res.send(updated);
            });
    })

    .delete('/mountains/:id', (req, res) => {
        const id = req.params.id;
        if (!id) {
            res.statusCode = 400;
            res.send({error: 'DELETE was called without ID'});
            //We need this return , don't we? We're telling it to bail the function, otherwise it'll continue.
            return;
        }
        const mountains = mongodb.db.collection('mountains');
        mountains.removeOne({ _id: ObjectID(id)})
            .then( result => {
                const status = {removed: result.deletedCount === 1};
                res.send(status);
            })
            .catch( err => errorHandler(err, req, res));

    });

module.exports = router;