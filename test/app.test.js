require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;
const http = require('http');
const app = require('../lib/app');

const server = http.createServer(app);
const request = chai.request(server);
after(() => server.close());
before(() => mongodb.connect(url));
after(() => mongodb.db.close());
// the code above can be modularized


const mongodb = require('../lib/mongodb');
const testUrl = process.env.MONGODB_URI_TEST;

describe('test treeRats API', () =>{

    it('it gets with id', () => {
        const treeRats = mongodb.db.collection('treeRats-test');
        const id = req.requested.params.id;
        treeRats.findOne( {_id: ObjectID(id) })
            .then(rodent=>{
                res.end(JSON.parse(rodent))
            })
    }
   


    // it('it saves with id', () => {
    //     const rodent = { type: 'flying squirrel', name: 'Apache'};
    //     request.post('/rodents')
    //         .send(rodent)
    //         .then(res => {
    //             const postedRodent = res.body;
    //             assert.ok(postedRodent._id);
    //             assert.equal(postedRodent.name, rodent.name);
    //         });
    // });




});