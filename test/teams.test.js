const request = require('./request');
const mongodb = require('../lib/mongodb');
const assert = require('chai').assert;


describe('teams API', () => {
    beforeEach(() => mongodb.db.dropDatabase());
    const blazers = { 
        name: 'blazers',
        sport: 'Basketball'
    };


    it('saves with id', () => {
        return request.post('/teams')
            .send(blazers)
            .then(res => {
                const team = res.body;
                assert.ok(team._id, 'missing id');
                assert.equal(team.name, blazers.name);
            });
    });

    it('get by id should return object with id', ()=>{
        let team = null;
        return request.post('/teams')
            .send(blazers)
            .then(res => {
                team = res.body;
            })
            .then(()=>{
                return request.get(`/teams/${team._id}`);
            })
            .then((res) =>{
                assert.deepEqual(res.body, team);
            });

    });

    it('get with no id should return an array of all objects in collection', ()=>{
        const teamz = [{ 
            name: 'blazers',
            sport: 'Basketball'
        },
        { 
            name: 'timbers',
            sport: 'soccer'
        }];
        
        const saves = teamz.map(team =>{
            return request.post('/teams')
                .send(team)
                .then(res => res.body);
        });

        let saved = null; 
        return Promise.all(saves)
            .then(_saved => {
                saved = _saved;
                return request.get('/teams');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);

            });
    

    });
});