const mongodb = require('../mongodb');
const errorHandler = require('../utils/error-handler');
const Router = require('express').Router;
const router = Router();
const ObjectID = require('mongodb').ObjectID;

router
    .post('/', (req, res) => {
        const mountains = mongodb.db.collection('mountains');
        mountains.insert(req.body)
            .then(result => {
                //Question: What is results.ops and what does it do.
                const mountain = result.ops[0];
                res.send(mountain);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id',(req, res) => {
        const mountains = mongodb.db.collection('mountains');
        const id = req.params.id;
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

    .get('/', (req, res) => {
        const mountains = mongodb.db.collection('mountains');
        mountains.find(req.query).toArray()
            .then( (mountains) => {
                res.send(mountains);
            });
        return;
    })

    .delete('/:id',(req, res) => {
        const id = req.params.id;
        if (!id) {
            res.statusCode = 400;
            res.send({error: 'DELETE was called without ID'});
            return;
        }
        const mountains = mongodb.db.collection('mountains');
        mountains.removeOne({ _id: ObjectID(id) })
            .then( result => {
                //Question: What is result.deletedCount and what is it doing here?
                const status = {removed: result.deletedCount === 1};
                res.send(status);
            })
            .catch( err => errorHandler(err, req, res));
    })



    .put('/:id/', (req, res) => {
        const id = req.params.id;
        const byId = { _id: ObjectID(id) };
        const mountains = mongodb.db.collection('mountains');
        mountains.update(byId, req.body)
            .then ( ()=>  mountains.findOne(byId) )
            .then((updated) => res.send(updated))
            .catch( err => errorHandler(err, req, res));
    });

module.exports = router;


