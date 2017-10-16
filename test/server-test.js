const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;
const http = require('http');
const MongoClient = require('mongodb').MongoClient;

const app = require('../lib/app');

const server = http.createServer(app);
const request = chai.request(server);



describe ('mountains API', ()=> {
  // beforeEach(() => MongoClient.db.dropDatabase());

    it('should ')
    const myMountain = { name: 'Doom'};
    return request.post
    
}