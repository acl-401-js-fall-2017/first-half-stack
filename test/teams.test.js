const request = require('./request');
const mongodb = require('../lib/mongodb');
const assert = require('chai').assert;


describe('teams API', () => {
    beforeEach(() => mongodb.db.dropDatabase());


    it('saves with id', () => {
        const blazers = { 
            name: 'blazers',
            sport: 'Basketball'
        };
        return request.post('/teams')
            .send(blazers)
            .then(res => {
                const team = res.body;
                assert.ok(team.id, 'missing id');
                assert.equal(team.name, blazers.name);
            });

    });





});