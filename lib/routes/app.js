const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// const publicDir = './public';
// app.use(express.static(publicDir));  
app.use(bodyParser.json ());  

const fruits = require('./fruits');
app.use('/fruits', fruits);

const methods = {
    POST(req, res) {
        const fruits = mongodb.db.collection('fruits');
        fruits.insert(req.body) 
            .then(results => {
                const fruit = results.ops[0];
                res.end(JSON.stringify(fruit));
            })
            .catch( err => errorHandler(err, req, res));
    },

    GET(req, res) {
        const fruits = mongodb.db.collection('fruits');
        const  id = req.requested.params.id;

        if(!id) {
            fruits.find().toArray()
                .then(fruits => {
                    res.end(JSON.stringify(fruits));
                });
            return;
        }

        fruits.findOne( { _id: ObjectID(id) })
            .then(fruit => {
                if(!fruit) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({
                        error: `id ${id} does not exist`
                    }));
                    return;
                }
                res.end(JSON.stringify(fruit));
            })
            .catch(err => errorHandler(err, req, res));
    },

    DELETE(req, res) {
        const id = req.requested.params.id;

        if(!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'DELETE called with no id'
            }));
            return;
        }

        const fruits = mongodb.db.collection('fruits');
        fruits.removeOne( { _id: ObjectID(id) })
            .then( result => {
                const status = {
                    removed: result.deletedCount === 1
                };
                res.end(JSON.stringify(status));
            })
            .catch(err => errorHandler(err, req, res));
    }
};
module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const subRoute = methods[req.method] || notFound;
    subRoute(req, res);
};