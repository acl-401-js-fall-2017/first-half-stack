const express = require('express');
const app = express();

const Router = require('express').Router;
const router = Router();

const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

const mongodb = require('../mongodb');
const errorHandler = require('../utils/error-handler');

const publicDir = './public';




router 

    .post( '/', (req, res) => {
        const teams = mongodb.db.collection('teams');
        
        teams.insert(req.body)

            .then(res => res.ops[0])
            .then(teams => res.send(teams))
            .catch(console.log);

    })

    .get('/', (req, res) => {
        const teams = mongodb.db.collection('teams');
        const id = req.requested.params.id;

        const query = {};

        if(req.query.name) query.name = req.query.name;
        if (req.query.origin) query.origin = req.query.origin;

        teams.find(query).toArray()
            .then(teams => res.send(teams))
            .catch(console.log);
    })

    .get('/:id', (req, res) => {
        const teams = mongodb.db.collection('teams');
        const id = req.requested.params.id;

        teams.findOne({ _id: ObjectID(id)}) //new ObjectID(req.params.id)
            .then(teams => res.send(teams))
            .catch(console.log);
    });

module.exports = router;

//     if (!id) {
//         teams.find().toArray()
//             .then(teams =>{
//                 res.end(JSON.stringify(teams));
//             });
//         return;
//     }
//     try {
//         teams.findOne({ _id: ObjectID(id) })
//             .then(team =>{
//                 if(!team){
//                     res.statusCode = 404;
//                     res.end(JSON.stringify({
//                         error :`id ${id} does not exist`
//                     }));
//                     return;
//                 }
//                 res.end(JSON.stringify(team));
//             })
//             .catch(err => errorHandler(err, req, res));
//     }
//     catch( err ) {
//         res.statusCode = 400;
//         res.end(JSON.stringify(err));
//     }
// })

// DELETE (req, res) {
//     const id = req.requested.params.id;
//     if(!id) {
//         res.statusCode = 400;
//         res.end(JSON.stringify({
//             error: 'DELETE called without id'
//         }));
//         return;
//     }

//     const teams = mongodb.db.collection('teams');
//     teams.removeOne({ _id: ObjectID(id) })
//         .then(result => {
//             const status = {
//                 removed: result.deletedCount === 1
//             };
//             res.end(JSON.stringify(status));
//         })
//         .catch(err => errorHandler(err, req, res));

// }

// PUT (req, res) {
//     const id = req.requested.params.id;
//     if(!id) {
//         res.statusCode = 400;
//         res.end(JSON.stringify({
//             error: 'PUT called without id'
//         }));
//         return;
//     }

//     const teams = mongodb.db.collection('teams');

//     teams.update({ _id: ObjectID(id) }, req.body)
//         .then(() => {
//             return teams.findOne({ _id: ObjectID(id) }); 
//         })
//         .then((team)=>{
//             console.log('The team ',team);
//             res.end(JSON.stringify(team));
//         })
                
//         .catch(err => errorHandler(err, req, res));
// }





// module.exports = (req, res) =>{
//     res.setHeader('Content-Type','application/json');

//     const subRoute = methods[req.method];
//     subRoute(req, res);
// };