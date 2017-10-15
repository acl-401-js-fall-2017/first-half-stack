const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
//const http = require('http');
const mongodb = require('../lib/mongodb');
const mongoUrl = 'mongodb://localhost:27017/test';

// const app = require('../lib/app');
// const server = http.createServer(app);
// const request = chai.request(server);

describe('MountainsDB',() => {
    
    it('detect existing entry in database', () => {
        return mongodb.connect(mongoUrl)
            .then( results => {
                return results.collection('mountains')
                    .find({name: 'adams'})
                    .toArray();
            })
            .then( (mountain) => {
                console.log('mountain is', mountain);
                assert.deepEqual(mountain, [{
                    '_id' : 1.0,
                    'name' : 'adams'
                }]);
            });
    });

});