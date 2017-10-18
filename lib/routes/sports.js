const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const errorHandler = require('../utils/error-handler');
const Router = require('express').Router;
const router = Router();


router
    .get('/teams', (req, res) => {
        const teams = mongodb.db.collection('teams');
        teams.find().toArray()
            .then(teams => {
                res.send(teams);
            });
    })
    .get('/teams/:id', (req, res) => {
        const id = req.params.id;
        const teams = mongodb.db.collection('teams');
        teams.findOne({ _id: ObjectID(id) })
            .then(team => {
                if (!team) {
                    res.statusCode = 404;
                    res.send(`id ${id} does not exist`);
                }
                else res.send(team);
            });

    })
    .post('/teams', (req, res) =>{
        const teams = mongodb.db.collection('teams');
        teams.insert(req.body)
            .then(result => {
                const team = result.ops[0];
                res.send(team);
            })
            .catch(console.error);
    })
    .delete('/teams/:id', (req, res) => {
        const teams = mongodb.db.collection('teams');
        const id = req.params.id;
        teams.removeOne({ _id: ObjectID(id) })
            .then(result => {
                if(!result){
                    res.statusCode = 404;
                    res.send(`id ${id} does not exist`);
                }
                const status = {
                    removed: result.deletedCount === 1
                };
                res.send(JSON.stringify(status));
            })
            .catch(err => errorHandler(err, req, res));
    })
    .put('/teams/:id', (req, res) => {
        const id = req.params.id;
        if (!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'PUT called without id'
            }));
            return;
        }
        
        const teams = mongodb.db.collection('teams');
        teams.update({ _id: ObjectID(id) }, req.body)
            .then(() => {
                return teams.findOne({ _id: ObjectID(id) });
            })
            .then((team) => {
                res.send(team);
            });
    });

module.exports = router;