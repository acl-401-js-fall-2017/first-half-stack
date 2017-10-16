const mongodb = require('../mongodb');
const ObjectID = require('mongodb').ObjectID;
const errorHandler = require('../utils/error-handler');

const methods = {
    POST(req, res) {
        const teams = mongodb.db.collection('teams');
        teams.insert(req.body)
            .then(result => {
                const team = result.ops[0];
                res.end(JSON.stringify(team));
            })
            .catch(err => errorHandler(err, req, res));

    },
    GET(req, res){
        const teams = mongodb.db.collection('teams');
        const id = req.requested.params.id;
        if (!id) {
            teams.find().toArray()
                .then(teams =>{
                    res.end(JSON.stringify(teams));
                });
            return;
        }
        try {
            teams.findOne({ _id: ObjectID(id) })
                .then(team =>{
                    if(!team){
                        res.statusCode = 404;
                        res.end(JSON.stringify({
                            error :`id ${id} does not exist`
                        }));
                        return;
                    }
                    res.end(JSON.stringify(team));
                })
                .catch(err => errorHandler(err, req, res));
        }
        catch( err ) {
            res.statusCode = 400;
            res.end(JSON.stringify(err));
        }
    },

    DELETE (req, res){
        const id = req.requested.params.id;
        if(!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'DELETE called without id'
            }));
            return;
        }

        const teams = mongodb.db.collection('teams');
        teams.removeOne({ _id: ObjectID(id) })
            .then(result => {
                const status = {
                    removed: result.deletedCount === 1
                };
                res.end(JSON.stringify(status));
            })
            .catch(err => errorHandler(err, req, res));

    },

    PUT (req, res) {
        const id = req.requested.params.id;
        if(!id) {
            res.statusCode = 400;
            res.end(JSON.stringify({
                error: 'PUT called without id'
            }));
            return;
        }

        const teams = mongodb.db.collection('teams');
        
        teams.update(req.body)
            .then(res => {
                const team = res.ops[0];
                res.end(JSON.stringify(team));
                
            })
            .catch(err => errorHandler(err, req, res));
    }



};

module.exports = (req, res) =>{
    res.setHeader('Content-Type','application/json');

    const subRoute = methods[req.method];
    subRoute(req, res);
};