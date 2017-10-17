const mongodb = require('../lib/mongodb');
const url = 'mongodb://localhost:27017/fruits-test';

before(() => mongodb.connect(url));
after(() => mongodb.db.close());