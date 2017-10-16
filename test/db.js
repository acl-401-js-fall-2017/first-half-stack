
const mongodb = require('../lib/mongodb');
const url = 'mongodb://localhost:27017/states';

before(() => mongodb.connect(url));
after(() => mongodb.db.close());