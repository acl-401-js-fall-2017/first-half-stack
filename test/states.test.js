
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
            return request.post('/api/states')
                .send(state)
                .then(res => res.body);
        });

        let saved = null;
        return Promise.all(posts)
            .then(_saved => {
                saved = _saved;
                return request.get('/api/states');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });
    });

    it('GET /states with query', () => {
        const states = [
            {state: 'California',  city: 'Anaheim', place: 'Disneyland'},
            {state: 'California', city: 'Los Angeles', place: 'Universal Studios'},
            {state: 'Washington', city: 'Seattle', place: 'Science Museum'}
        ];

        const posts = states.map(state => {
            return request.post('/api/states')
                .send(state)
                .then(res => res.body);
        });

        return Promise.all(posts)
            .then(() => request.get('/api/states?city=Seattle'))
            .then(res => {
                assert.equal(res.body[0].state, 'Washington');
            })
            .then(() => request.get('/api/states?state=California&city=Anaheim'))
            .then(res => {
                assert.equal(res.body[0].place, 'Disneyland');
            });
    });

    it('POSTs an item into the db', () => {
        const oregon = { name: 'Oregon', city: 'Portland', place: 'Powells'};
        return request.post('/api/states')
            .send(oregon)
            .then(res => {
                const state = res.body;
                assert.equal(state.name, oregon.name);
            });
    });

    it('GET by id', () => {
        const oregon = { name: 'Oregon', city: 'Portland', place: 'Powells'};
        let state = null;
        return request.post('/api/states')
            .send(oregon)
            .then(res => {
                state = res.body;
                return request.get(`/api/states/${state._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, state);
            });
    });

    it('GET 404 if id is not found', () => {
        return request.get('/api/states/59dfeaeb083bf9beecc97ce8')
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);
                }
            );
    });

    it('DELETE by id', () => {
        const oregon = { name: 'Oregon', city: 'Portland', place: 'Powells'};
        let state = null;
        return request.post('/api/states')
            .send(oregon)
            .then(res => {
                state = res.body;
                return request.delete(`/api/states/${state._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, {removed: true});
                return request.get(`/api/states/${state._id}`);
            })
            .then(
                () => { throw new Error ('Unexpected successful response');},
                err => {
                    assert.equal(err.status, 404);
                }
            );
    });

    it('PUT update info by id', () => {
        const oregon = { name: 'Oregon', city: 'Portland'};
        let state = null;
        return request.post('/api/states')
            .send(oregon)
            .then(res => {
                state = res.body;
                oregon.city = 'Beaverton';
                return request
                    .put(`/api/states/${state._id}`)
                    .send(oregon);
            })
            .then(res => {
                assert.equal(res.body.nModified, 1);
                return request.get(`/api/states/${state._id}`);
            })
            .then(res => {
                assert.equal(res.body.city, 'Beaverton');
            });            
    });
});