
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

});