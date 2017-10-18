require('dotenv').config('../.env');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;
const http = require('http');
const app = require('../lib/app');


const mongodb = require('../lib/mongodb');
const testUrl = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/treeRats-test';


describe('test treeRats API', () => {
   
    let server = null;
    let request = null;
    before(() => {
        server = http.createServer(app);
        request = chai.request(server);
    });

    before(() => mongodb.connect(testUrl));
    after(() =>  mongodb.db.close());
    after(() => server.close());
    // the code above can be modular
    describe('POST, GET, GET ALL', () => {
        beforeEach(() => mongodb.db.dropDatabase());
    
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
            return request.get('/rodents/59e401db548d1096dde508a6')
                .then( 
                    ()=> {throw new Error('found incorrect id'); },
                    err => {
                        assert.equal(err.status, 404);
                    });
        });

        it('gets all saved objects from database', () => {
            const rodents = [
                {type:'mouse' , name:'experimentKing' },
                {type:'flyingSquirrel', name:'wingMan'}
            ];

            const posts = rodents.map(rodent => {
                return request.post('/rodents')
                    .send(rodent)
                    .then(res => res.body);
            });

            let saved = null;
            return Promise.all(posts)
                .then(_saved => {
                    saved = _saved;
                    return request.get('/rodents');
                })
                .then(res => {
                    assert.deepEqual(res.body, saved);
                });
        });

        it('deletes saved object with giving id', () => {
            const mickeyMouse ={ type: 'mouse', name: 'mickey' };
            let rodent = null;
            return request.post('/rodents')
                .send(mickeyMouse)
                .then(res => {
                    rodent = res.body;
                    return request.delete(`/rodents/${rodent._id}`);
                })
                .then(res => {
                    assert.deepEqual(res.body, { removed: true });
                    return request.get(`/rodents/${rodent._id}`);
                })
                .then(
                    () => { throw new Error('Unexpected successful response');},
                    err => {
                        assert.equal(err.status, 404);
                    }
                );
        });
    });      
        
    describe('PUT', () => {
       
        let rodent =null;
        before(() => {
            let mickeyMouse = { type: 'mouse', name: 'mickey' };
            return request.post('/rodents')
                .send(mickeyMouse)
                .then(res => {
                    rodent = res.body;
                });
        });
        
        it('changes a saved object with id', () => {
                
            return request.put(`/rodents/${rodent._id}`)
                .send({ type: 'geneticallyModifiedMouse', name:'alteredMickey'})
                .then(res => {
                    assert.deepEqual(res.body, {updated: true });
                });  
        });
    });

});