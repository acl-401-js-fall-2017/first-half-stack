const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/testMichele';
MongoClient.connect(url)
    .then(db => {
        db.collection('testMichele')
            .find()
            .toArray()
            .then(dogs => {
                console.log(dogs);
            });
        db.close();
    });