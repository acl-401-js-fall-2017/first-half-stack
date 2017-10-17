
const request = require('./request');
const mongodb = require('../lib/mongodb');
const assert = require('chai').assert;

describe ('states API', () => {

    beforeEach(() => mongodb.db.dropDatabase());

    it('GET /states', () => {
        const states = [
            {state: 'California',  city: 'Anaheim', place: 'Disneyland'},
            {state: 'Washington', city: 'Seattle', place: 'Science Museum'}
        ];

        const posts = states.map(state => {
            return request.post('/states')
                .send(state)
                .then(res => res.body);
        });

        let saved = null;
        return Promise.all(posts)
            .then(_saved => {
                saved = _saved;
                return request.get('/states');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });
    });

    it.skip('saves with id', () => {
        const oregon = { name: 'Oregon', city: 'Portland', place: 'Powells'};
        return request.post('/states')
            .send(oregon)
            .then(res => {
                const state = res.body;
                assert.equal(state.name, oregon.name);
            });
    });

    it('GET by id', () => {
        const oregon = { name: 'Oregon', city: 'Portland', place: 'Powells'};
        let state = null;
        return request.post('/states')
            .send(oregon)
            .then(res => {
                state = res.body;
                return request.get(`/states/${state._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, state);
            });
    });

    it('GET 404 if id is not found', () => {
        return request.get('/states/343423')
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);
                }
            );
    });

});