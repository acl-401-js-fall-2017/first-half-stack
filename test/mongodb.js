const {MongoClient} = require('mongodb');

module.exports = {
    db: null,
    connect(url) {
        return MongoClient.connect(url)
            .then(db => {
                return this.db = db;
            });
    }
}