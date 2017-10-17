const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
// const notFound = require('../utils/not-found');
// const errorHandler = require('../utils/error-handler');

const Router = require('express').Router;
const router = Router();

router
    .post('/',(req,res) => {
        const rodents = mongodb.db.collection('treeRats-test');
        rodents.insert(req.body)
            .then(result => {
                const savedObj = result.ops[0];
                res.send(savedObj); 
            })
            .catch(console.error);
    })

    .get('/',(req,res) => {
        const rodents = mongodb.db.collection('treeRats-test');        
        rodents.find().toArray()
            .then(rodents => {
                res.send(rodents);
            })
            .catch(console.error);
    }) 
        
    .get('/:id',(req,res) => {
        const rodents = mongodb.db.collection('treeRats-test');
        const id = req.params.id;
        rodents.findOne({ _id: ObjectID(id) })
            .then(savedObj => {
                if(!savedObj) {
                    res.statusCode =404;
                    res.send(JSON.stringify({error: `id ${id} does not exist`}));
                    return;
                }
                res.send(savedObj);
            })
            .catch(console.error);      
    })

    .delete('/:id',(req,res) => {
        const id = req.params.id; 
        const rodents = mongodb.db.collection('treeRats-test');
        rodents.removeOne({ _id: ObjectID(id)})
            .then(result => {
                const status = { removed: result.deletedCount === 1 };
                res.send(status);
            })
            .catch(console.error);        
    })

    .put('/:id',(req,res) => {
        const id = req.params.id; 

        const rodents = mongodb.db.collection('treeRats-test');
        rodents.updateOne({ _id: ObjectID(id)}, {$set: req.body})
            .then((result) => {
                res.send( {updated: result.modifiedCount === 1  });
            })
            .catch(console.error);
    });
    


module.exports = router;
