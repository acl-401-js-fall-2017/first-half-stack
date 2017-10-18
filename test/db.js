const mongodb = require('../lib/mongodb');
const url = 'mongodb://localhost:27017/sports';

before(() => mongodb.connect(url));
after(() => mongodb.db.close());