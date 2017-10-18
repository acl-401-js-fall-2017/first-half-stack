/********************************************************
 * PURPOSE
 * -------------
 * - Provide a simple way to connect mongodb
 * - provide easy access to the db connected
 * - utilized in db.js
 * 
 ********************************************************/
const {MongoClient} = require('mongodb');

module.exports = {
    db: null,
    connect(url) {
        return MongoClient.connect(url)
            .then(db => {
                db.createCollection('proteins');
                return this.db = db;
            });
    }
};