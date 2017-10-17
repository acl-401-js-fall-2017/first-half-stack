const Router = require('express').Router;
const router = Router();

const express = require('express');
// const path  = require('path');
const app = express();

const publicDir = './public';

app.use(express.static(publicDir));

const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
// const notFound = require('../utils/not-found');
const errorHandler = require('../utils/error-handler');


router
    .get('/mountains', (req, res) => {
        const mountains = mongodb.db.collection('mountains');
        const id = req.requested.params.id;
        if (!id) {
            mountains.find().toArray()
                .then( (mountains) => {
                    res.end(JSON.stringify(mountains));
                });
            return;
        }

        mountains.findOne({ _id: ObjectID(id) })
            .then( mountain => {
                if (!mountain) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({error: `id ${id} does not exist` }));
                    return;
                }
                res.end(JSON.stringify(mountain));
            })
            .catch(err => errorHandler(err, req, res));
    })

    .post('/mountains', (req, res) => {
        const mountains = mongodb.db.collection('mountains');
        mountains.insert(req.body)
            .then(result => {
                const mountain = result.ops[0];
                res.end(JSON.stringify(mountain));
            })
            .catch(err => errorHandler(err, req, res));
    });


// const methods = {
//     POST(req, res) {
//         const mountains = mongodb.db.collection('mountains');
//         mountains.insert(req.body)
//             .then(result => {
//                 //Question: What is result.ops and what does it do.
//                 const mountain = result.ops[0];
//                 res.end(JSON.stringify(mountain));
//             })
//             .catch(err => errorHandler(err, req, res));
//     },

//     GET(req, res) {
//         const mountains = mongodb.db.collection('mountains');
//         const id = req.requested.params.id;
//         if (!id) {
//             mountains.find().toArray()
//                 .then( (mountains) => {
//                     res.end(JSON.stringify(mountains));
//                 });
//             return;
//         }

//         mountains.findOne({ _id: ObjectID(id) })
//             .then( mountain => {
//                 if (!mountain) {
//                     res.statusCode = 404;
//                     res.end(JSON.stringify({error: `id ${id} does not exist` }));
//                     return;
//                 }
//                 res.end(JSON.stringify(mountain));
//             })
//             .catch(err => errorHandler(err, req, res));
//     },

//     PUT(req, res){
//         const mountains = mongodb.db.collection('mountains');
//         const id = req.requested.params.id;
        
//         if (id.length != 24) {
//             res.statusCode = 404;
//             res.end(JSON.stringify({error: 'fail'}));
//             return;
//         }

//         mountains.update({ _id: ObjectID(id) }, req.body)
//             .then( () => {
//                 res.end();
//             });
//     },

//     DELETE(req, res) {
//         const id = req.requested.params.id;
//         if (!id) {
//             res.statusCode = 400;
//             res.end(JSON.stringify({error: 'DELETE was called without ID'}));
//             return;
//         }
//         const mountains = mongodb.db.collection('mountains');
//         mountains.removeOne({ _id: ObjectID(id)})
//             .then( result => {
//                 //Question: What is result.deletedCount and what is it doing here?
//                 const status = {removed: result.deletedCount === 1};
//                 res.end(JSON.stringify(status));
//             })
//             .catch( err => errorHandler(err, req, res));
//     }

// };



module.exports = router;