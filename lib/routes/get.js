const mongodb = require('../mongodb');

module.exports = function(req, res) {
    const collection = req.url.split('/')[1];

    console.log(mongodb);
    return mongodb.db.collection(collection).find()
        .toArray()
        .then( output => res.end(JSON.stringify(output)));
};