const Router = require('express').Router;
const router = Router();
const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const errorHandler = require('../utils/error-handler');
const notFound = require('../utils/not-found'); //eslint-disable-line


router
    .post('/', (req, res) => {
        const states = mongodb.db.collection('states');
        states.insert(req.body)
            .then(result => {
                const state = result.ops[0];
                res.json(state);
            })
            .catch(err => errorHandler(err, req, res));
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









// GET(req, res) {
//     const states = mongodb.db.collection('states');
//     const id = req.requested.params.id;
//     if(!id) {
//         states.find().toArray()
//             .then(states => {
//                 res.end(JSON.stringify(states));
//             });
//         return;
//     }


    // states.findOne({ _id: ObjectID(id) })
    //     .then(state => {
    //         if(!state) {
    //             res.statusCode = 404;
    //             res.end(JSON.stringify({
    //                 error: `id ${id} does not exist`
    //             }));
    //             return;
    //         }
    //         res.end(JSON.stringify(state));
    //     })
//         .catch(err => errorHandler(err, req, res));
// },

// POST(req, res) {
//     const states = mongodb.db.collection('states');
//     states.insert(req.body)
//         .then(result => {
//             const state = result.ops[0];
//             res.end(JSON.stringify(state));
//         })
//         .catch(err => errorHandler(err, req, res));
// },

// DELETE(req, res) {
//     const id = req.requested.params.id;
//     if(!id) {
//         res.statusCode = 404;
//         res.end(JSON.stringify({
//             error: 'DELETE called without id'
//         }));
//         return;
//     }

//     const states = mongodb.db.collection('states');
//     states.removeOne({ _id: ObjectID(id) })
//         .then(result => {
//             const status = {
//                 removed: result.deletedCount === 1
//             };
//             res.end(JSON.stringify(status));
//         })
//         .catch(err => errorHandler(err, req, res));
// },

// PUT(req, res) {
//     const states = mongodb.db.collection('states');
//     const id = req.requested.params.id;
//     states.update({ _id: ObjectID(id) }, req.body)
//         .then(result => {
//             const status = result.result;
//             res.end(JSON.stringify(status));
//         });
// }
// };



// const mongodb = require('../mongodb');
// const ObjectID = require('mongodb').ObjectID;
// const errorHandler = require('../utils/error-handler');
// const notFound = require('../utils/not-found');

// const methods = {
//     GET(req, res) {
//         const states = mongodb.db.collection('states');
//         const id = req.requested.params.id;
//         if(!id) {
//             states.find().toArray()
//                 .then(states => {
//                     res.end(JSON.stringify(states));
//                 });
//             return;
//         }


//         states.findOne({ _id: ObjectID(id) })
//             .then(state => {
//                 if(!state) {
//                     res.statusCode = 404;
//                     res.end(JSON.stringify({
//                         error: `id ${id} does not exist`
//                     }));
//                     return;
//                 }
//                 res.end(JSON.stringify(state));
//             })
//             .catch(err => errorHandler(err, req, res));
//     },

//     POST(req, res) {
//         const states = mongodb.db.collection('states');
//         states.insert(req.body)
//             .then(result => {
//                 const state = result.ops[0];
//                 res.end(JSON.stringify(state));
//             })
//             .catch(err => errorHandler(err, req, res));
//     },

//     DELETE(req, res) {
//         const id = req.requested.params.id;
//         if(!id) {
//             res.statusCode = 404;
//             res.end(JSON.stringify({
//                 error: 'DELETE called without id'
//             }));
//             return;
//         }

//         const states = mongodb.db.collection('states');
//         states.removeOne({ _id: ObjectID(id) })
//             .then(result => {
//                 const status = {
//                     removed: result.deletedCount === 1
//                 };
//                 res.end(JSON.stringify(status));
//             })
//             .catch(err => errorHandler(err, req, res));
//     },

//     PUT(req, res) {
//         const states = mongodb.db.collection('states');
//         const id = req.requested.params.id;
//         states.update({ _id: ObjectID(id) }, req.body)
//             .then(result => {
//                 const status = result.result;
//                 res.end(JSON.stringify(status));
//             });
//     }
// };


// module.exports = (req, res) => {
//     res.setHeader('Content-Type', 'application/json');

//     const subRoute = methods[req.method] || notFound;
//     subRoute(req, res);
// };
