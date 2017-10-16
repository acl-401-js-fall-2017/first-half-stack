const mongoConnect = require('./mongoConnect');

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
    }
    
};

module.exports = mountains;