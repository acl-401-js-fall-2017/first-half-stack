const Router = require('express').Router;
const router = Router();
const mongodb = require('../mongodb');
const errorHandler = require('../utils/error-handler');
const ObjectID = require('mongodb').ObjectID;

router

    .post('/', (req, res) => {
        const fruits = mongodb.db.collection('fruits');
        fruits.insert(req.body)
            .then(res => res.ops[0])
            .then(fruits => res.send(fruits))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) => {
        const fruits = mongodb.db.collection('fruits');
        fruits.find(req.query).toArray()
            .then(fruits => res.send(fruits));
        return;
    })

    .get('/:id', (req, res) => {
        const fruits = mongodb.db.collection('fruits');
        const id = req.params.id;

        fruits.findOne({ _id: ObjectID(id) })
            .then(fruits => {
                if (!fruits) {
                    res.statusCode = 404;
                    res.send({ error: `id ${id} does not exist` });
                    return;
                }
                res.send(fruits);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .delete('/:id', (req, res) => {
        const id = req.requested.params.id;

        if (!id) {
            res.statusCode = 400;
            res.send({ error: 'No id to delete' });
            return;
        }

        const fruits = mongodb.db.collection('fruits');
        fruits.removeOne({ _id: ObjectID(id) })
            .then(result => {
                const status = {
                    removed: result.deletedCount === 1
                };
                res.send(status);
            })
            .catch(err => errorHandler(err, req, res));
    });

module.exports = router;