const Router = require('express').Router;
const router = Router();
const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const errorHandler = require('../utils/error-handler');



router 
    .post('/', (req, res) => {
        const fruits = mongodb.db.collection('fruits');

        fruits.insert(req.body)
            .then(res => res.ops[0])
            .then(fruits => res.send(fruits))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/', (req, res) =>{
        const fruits = mongodb.db.collection('fruits');

        fruits.find(req.query).toArray()
            .then(fruits => res.send(fruits));
        return;
    })

    .get('/:id', (req, res) => {
        const fruits = mongodb.db.collection('fruits');
        const id = req.params.id;

        fruits.findOne({_id: ObjectID(id)})
            .then(fruits => {
                if(!fruits) {
                    res.statusCode = 404;
                    res.send({error: `id: ${id} does not exist`});
                    return;
                }
                res.send(fruits);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .delete('/:id', (req, res) => {
        const id = req.params.id;

        if(!id) {
            res.statusCode = 400;
            res.send({error: 'Delete called with no id'});
            return;
        }
        const fruits = mongodb.db.collection('fruits');

        fruits.removeOne( {_id: ObjectID(id) })
            .then( results => {
                const status = {
                    removed: results.deletedCount === 1
                };
                res.send(status);
            })
            .catch( err => errorHandler(err, req, res ));
    });

module.exports = router;