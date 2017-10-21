// const Router = require('express').Router;
// const router = Router();



// router
//     .get('/', (req, res) => {
//         res.send([
//             { name: 'Straw Hats Pirates' }, 
//             { name: 'Foxxy Pirates'}]
//         );
//     })

//     .get('/:id', (req, res) => {
//         res.send({ name: 'Straw Hats Pirates' });
//     })

//     .post('/', (req, res) => {
//         res.send(req.body);
//     })

//     .delete('/:id', (req, res) => {
//         res.send({ removed: true });
//     });



// module.exports = router;






const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const errorHandler = require('../utils/error-handler');
const notFound = require('../utils/not-found');


const methods = {
    GET(req, res) {
        const states = mongodb.db.collection('states');
        const id = req.requested.params.id;
        if(!id) {
            states.find().toArray()
                .then(states => {
                    res.end(JSON.stringify(states));
                });
            return;
        }


        states.findOne({ _id: ObjectID(id) })
            .then(state => {
                if(!state) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({
                        error: `id ${id} does not exist`
                    }));
                    return;
                }
                res.end(JSON.stringify(state));
            })
            .catch(err => errorHandler(err, req, res));
    },

    POST(req, res) {
        const states = mongodb.db.collection('states');
        states.insert(req.body)
            .then(result => {
                const state = result.ops[0];
                res.end(JSON.stringify(state));
            })
            .catch(err => errorHandler(err, req, res));
    },

    DELETE(req, res) {
        const id = req.requested.params.id;
        if(!id) {
            res.statusCode = 404;
            res.end(JSON.stringify({
                error: 'DELETE called without id'
            }));
            return;
        }

        const states = mongodb.db.collection('states');
        states.removeOne({ _id: ObjectID(id) })
            .then(result => {
                const status = {
                    removed: result.deletedCount === 1
                };
                res.end(JSON.stringify(status));
            })
            .catch(err => errorHandler(err, req, res));
    },

    PUT(req, res) {
        const states = mongodb.db.collection('states');
        const id = req.requested.params.id;
        states.update({ _id: ObjectID(id) }, req.body)
            .then(result => {
                const status = result.result;
                res.end(JSON.stringify(status));
            });
    }
};


module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const subRoute = methods[req.method] || notFound;
    subRoute(req, res);
};