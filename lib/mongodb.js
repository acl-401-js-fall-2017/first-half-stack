const MongoClient = require('mongodb').MongoClient;

module.exports = {
    db: null,
    connect(url) {
        return MongoClient.connect(url)
            .then((database) => {
                this.db = database;
                return database;
            });
    }
};