const mongodb = require('./mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/proteins';

before(() => {
    mongodb.connect(url);
});

after(() => {
    mongodb.db.close();
});