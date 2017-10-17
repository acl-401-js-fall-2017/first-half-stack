
const mongodb = require('../lib/mongodb');
const url = 'mongodb://localhost:27017/vacations-test';

before(() => mongodb.connect(url));
after(() => mongodb.db.close());