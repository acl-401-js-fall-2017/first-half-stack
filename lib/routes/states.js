const Router = require('express').Router;
const router = Router();
const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;


router
    .post('/', (req, res) => {
        const states = mongodb.db.collection('states');
        states.insert(req.body)
            .then(result => {
                const state = result.ops[0];
                res.json(state);
            });
    })

    .get('/:id', (req, res) => {
        const states = mongodb.db.collection('states');
        const id = req.params.id;
        states.findOne({ _id: ObjectID(id) })
            .then(state => {
                if(!state) {
                    res.statusCode = 404;
                    res.json(`id ${req.params.id} does not exist`);
                } 
                else res.json(state);
            });
    })

    .get('/', (req, res) => {
        const states = mongodb.db.collection('states');
        const query = req.query;
        states.find(query).toArray()
            .then(results => res.json(results));

    })

    .delete('/:id', (req, res) => {
        const states = mongodb.db.collection('states');
        const id = req.params.id;
        states.removeOne({ _id: ObjectID(id) })
            .then(results => {
                const exists = results != null;
                res.json({removed: exists});               
            });
    })

    .put('/:id', (req, res) => {
        const states = mongodb.db.collection('states');
        const id = req.params.id;
        states.update({ _id: ObjectID(id) }, req.body)
            .then(result => {
                const status = result.result;
                res.json(status);
            });

    });

module.exports = router;