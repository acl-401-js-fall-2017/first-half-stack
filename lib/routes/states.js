
const mongodb = require('../mongodb');
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
    }, 

    POST(req, res) {
        const states = mongodb.db.collection('states');
        states.insert(req.body)
            .then(result => {
                const state = result.ops[0];
                res.end(JSON.stringify(state));
            })
            .catch(err => errorHandler(err, req, res));
    }
};


module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const subRoute = methods[req.method] || notFound;
    subRoute(req, res);
};