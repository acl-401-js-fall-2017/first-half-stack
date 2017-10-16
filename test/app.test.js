require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;
const http = require('http');
const app = require('../lib/app');


const mongodb = require('../lib/mongodb');
const testUrl = process.env.MONGODB_URI_TEST;


describe('test treeRats API', () => {
   
    let server = null;
    let request = null;
    before(() => {
        server = http.createServer(app);
        request = chai.request(server);
    });

    before(() => mongodb.connect(testUrl));
    beforeEach(() => mongodb.db.dropDatabase());
    after(() =>  mongodb.db.close());
    after(() => server.close());
    // the code above can be modularized

    it('it saves a rodent with an id', () => {
        const mickeyMouse ={ type: 'mouse', name: 'mickey' };
        return request.post('/rodents')
            .send(mickeyMouse)
            .then(res => {
                const rodents = res.body;
                assert.ok(rodents._id, 'Missing Id');
                assert.equal(rodents.name, mickeyMouse.name);
            });
    });

    it('get saved object with id', () => {
        const mickeyMouse ={ type: 'mouse', name: 'mickey' };
        let rodent =null;
        return request.post('/rodents')
            .send(mickeyMouse)
            .then(res => {
                rodent = res.body;
                return request.get(`/rodents/${rodent._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, rodent);
            });  
    });

    it('get by id returns 404 for bad id', () => {
        return request.get('/rodents/59e401db548d1096dde508a1')
            .then( 
                ()=> {throw new Error('found incorrect id'); },
                err => {
                    assert.equal(err.status, 404);
                });
    });

    // it('gets array of all saved objects', () => {
    //     const rodents = [
    //         { type: 'squirrel', name: 'nutCracker'},
    //         { type: 'chipmunk', name: 'Alvin'}
    //     ];
    //     const savedObjects = rodents.map(rodent => {
    //         return request.post('/rodents')
    //             .send(rodent)
    //             .then(res => res.body);
    //     });
    // });
});