/********************************************************
 * PURPOSE
 * -------------
 * - initiate mongodb before all tests
 * - close it after
 * - utilizes mongodb.js object
 * 
 ********************************************************/
const mongodb = require('../lib/mongodb');

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/first_half_stack';

before(() => {
    mongodb.connect(url);
});

after(() => {
    mongodb.db.close();
});