const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const notFound = require('../utils/not-found');
const errorHandler = require('../utils/error-handler');

const methods = {
    POST(req,res) {
        const rodents = mongodb.db.collection('treeRats-test');
        rodents.insert(req.body)
            .then(result => {
                const savedObj = result.ops[0];
                res.end(JSON.stringify(savedObj)); 
            })
            .catch(err => errorHandler(err, req, res));
    },

    GET(req, res) {
        const rodents = mongodb.db.collection('treeRats-test');
        const id = req.requested.params.id;
        
        if(!id) {
            rodents.find().toArray()
                .then(rodents => {
                    res.end(JSON.stringify(rodents));
                });
            return;
        }
        
        rodents.findOne({ _id: ObjectID(id) })
            .then(savedObj => {
                if(!savedObj) {
                    res.statusCode =404;
                    res.end(JSON.stringify({error: `id ${id} does not exist`}));
                    return;
                }
                res.end(JSON.stringify(savedObj));
            })
            .catch(err => errorHandler (err, req, res));

            
    },

    DELETE(req, res) {
        const id = req.requested.params.id; 
        if(!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'DELETE called without id'}));
            return;
        }

        const rodents = mongodb.db.collection('treeRats-test');
        rodents.removeOne({ _id: ObjectID(id)})
            .then(result => {
                const status = { removed: result.deletedCount === 1 };
                res.end(JSON.stringify(status));
            })
            .catch(err => errorHandler(err, req, res));
    },

    PUT(req, res){
        const id = req.requested.params.id; 

        const rodents = mongodb.db.collection('treeRats-test');
        rodents.updateOne({ _id: ObjectID(id)}, {$set: req.body})
            .then(result => {
                res.end(JSON.stringify({ updated: result.modifiedCount === 1 }));
            })
            .catch(err => errorHandler(err, req, res));
    }
};

module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const subRoute = methods[req.method] || notFound;
    subRoute(req, res);
};