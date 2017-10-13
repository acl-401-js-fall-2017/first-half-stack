/********************************************************
 * PURPOSE
 * -------------
 * - initiate mongodb before all tests
 * - close it after
 * - utilizes mongodb.js object
 * 
 ********************************************************/
const mongodb = require('../lib/mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/proteins';

before(() => {
    mongodb.connect(url);
    console.log('mongodb connected +============================================');
});

after(() => {
    mongodb.db.close();
    console.log('mongodb closed +============================================')
});