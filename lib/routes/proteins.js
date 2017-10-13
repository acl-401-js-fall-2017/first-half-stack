const mongodb = require('../mongodb');

const collection = req.url.split('/')[1];

const methods = {
    GET: function(req, res) {
        console.log(mongodb);
        return mongodb.db.collection(collection).find()
            .toArray()
            .then( output => res.end(JSON.stringify(output)));

    }

} 


module.exports = function(req, res) {
    methods[req.method](req, res);
    
};