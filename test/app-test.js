const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
//const http = require('http');
const mongodb = require('../lib/mongodb');
const mongoUrl = 'mongodb://localhost:27017/mountains';

// const app = require('../lib/app');
// const server = http.createServer(app);
// const request = chai.request(server);

describe('MountainsDB',() => {

    
    it('get by id', () => {
        return mongodb.connect(mongoUrl)
            .then( results => {
                assert.ok(results);
            });
    });



});