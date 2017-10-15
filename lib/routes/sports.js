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

    }
};

module.exports = (req, res) =>{
    res.setHeader('Content-Type','application/json');

    const subRoute = methods[req.method];
    subRoute(req, res);
};