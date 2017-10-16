const mongodb = require('../mongodb');

const mongoUrl = 'mongodb://localhost:27017/test';






const mountains = {
    GET(){
        console.log('get is running'); 
        return mongoConnect.connect(mongoUrl)
            .then( (db) => {
                return db.collection('mountains').find().toArray();
            });
    },

    POST(object){
        console.log('post is running');
        return mongoConnect.connect(mongoUrl)
            .then( (db) => {
                return db.collection('mountains').insert(object);
            });
    },
    
    GET_id(id){
        console.log('get_id is running');
        return mongoConnect.connect(mongoUrl)
            .then( (db) => {
                return db.collection('mountains').find({_id: id}).toArray();
            })
            .then ((got) => got[0]  );
    },

    DELETE(id){
        return mongoConnect.connect(mongoUrl)
            .then( (db) => {
                return db.collection('mountains').remove({_id: id});
            });
    },

    PUT(id, change){
        return mongoConnect.connect(mongoUrl)
            .then( (db) => {
                return db.collection('mountains').update({_id: id}, change);
            });
    },
};

module.exports = mountains;