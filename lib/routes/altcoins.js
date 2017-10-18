const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const errorHandler = require('../utils/error-handler');

const Router = require('express').Router;
const router = Router();

router
    .get('/', (req, res) => {
        const altcoins = mongodb.db.collection('altcoins');
        res.send(altcoins.find().toArray());
    })
    .get('/:id', (req, res) => {
        const altcoins = mongodb.db.collection('altcoins');
        altcoins.findOne({ _id: ObjectID(req.params.id) })
            .then(altcoin => {
                if(!altcoin) {
                    res.statusCode = 404;
                    res.send(JSON.stringify({
                        error: `id ${req.params.id} does not exist`
                    }));
                    return;
                }
            })
            .catch(err => (err, req, res));
                
    })
    .post('/', (req, res) => {
        const altcoins = mongodb.db.collection('altcoins');
        altcoins.insert(req.body)
            .then(res => {
                const altcoin = res.ops[0];
                res.send(altcoin);
            })
            .catch(err => errorHandler(err, req, res));
    })
    .delete('/:id', (req, res) => {
        if(!req.param.id) {
            res.statusCode = 400;
            res.send({ error: 'DELETE called without id'});
            return;
        }
        
        const altcoins = mongodb.db.collection('altcoins');
        altcoins.removeOne({ _id: ObjectID(req.params.id) })
            .then(result => {
                const status = {
                    removed: result.deletedCount === 1
                };
                res.send(status);
            })
            .catch(err => errorHandler(err, req, res));

    });
module.exports = router;