const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const altcoins = mongodb.db.collection('altcoins');
const Router = require('express').Router;
const router = Router();

router
    .get('/', (req, res) => {
        res.send(altcoins.find().toArray()
            .then(altcoins => {
                res.end(JSON.stringify(altcoins));
            }));
    })
    .get('/:id', (req, res) => {
        const id = req.requested.params.id;
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
    })
    .post('/', (req, res) => {
        altcoins.insert(req.body)
            .then(result => {
                const altcoin = result.ops[0];
                res.end(JSON.stringify(altcoin));
            })
            .catch(err => errorHandler(err, req, res));
    })
    .delete('/:id', (req, res) => {
        if(!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'DELETE called without id'
            }));
            return;
        }

        altcoins.removeOne({ _id: ObjectID(id) })
            .then(result => {
                const status = {
                    removed: result.deletedCount === 1
                };
                res.end(JSON.stringify(status));
            })
            .catch(err => errorHandler(err, req, res));

    });
module.exports = router;