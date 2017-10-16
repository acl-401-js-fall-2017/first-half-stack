const request = require('./request');
const mongodb = require('../lib/mongodb');
const assert = require('chai').assert;

describe('mountain api', () => {

    beforeEach( () => {
        //Question: what is dropDatabase and why are we using it?
        mongodb.db.dropDatabase();
    });

    it('saves with id', () => {

        const doom = {name: 'doom'};
        return request.post('/mountains')
            .send(doom)
            .then( res => {
                const mountain = res.body;
                assert.ok(mountain._id, 'Missing Id');
                assert.equal(mountain.name, doom.name);
            });

    });

    it('gets by id', () => {
        const doom = {name:'doom'};
        let mountain = null;
        return request.post('/mountains')
            .send(doom)
            .then( res => {
                mountain = res.body;
                return request.get(`/mountains/${mountain._id}`);
            })
            .then( res => {
                assert.deepEqual(res.body, mountain);
            });
    });

    it.only('get by id returns 404 for bad id', () => {
        return request.get('/mountains/dksjghjskdg')
            .then(
                () => { throw new Error('unexpected successful response');},
                error => {
                    assert.equal(error.status, 404);
                }
            );
    });







});