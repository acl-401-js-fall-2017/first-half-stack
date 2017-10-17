const request = require('./request');
const mongodb = require('../lib/mongodb');
const assert = require('chai').assert;
// const db = require('./db');

const url = 'mongodb://localhost:27017/cheeses-test';

describe('teams API', () => {
    // before(() => mongodb.db.connect(url));
    // beforeEach(() => mongodb.db.dropDatabase());
    const blazers = { 
        name: 'blazers',
        sport: 'Basketball'
    };


    it.only('saves with id', () => {
        return request.post('/api/teams')
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

    it('get with bad ID should return 404 error', () => {
        return request.get('/teams/59dfeaeb083bf9beecc97ce8')
            .then( 
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);
                }
            );
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

    it('deletes by id', () => {
        const blazers = { 
            name: 'blazers'
        };

        let team = null;

        return request.post('/teams')
            .send(blazers)
            .then(res => {
                team = res.body;
                return request.delete(`/teams/${team._id}`);
            })
            .then( res => {
                assert.deepEqual(res.body, { removed: true });
                return request.get(`/teams/${team._id}`);
            })
            .then(
                () => { throw new Error('Unexpected successful response');},
                err => {
                    assert.equal(err.status, 404);
                }
            );

    });

    it('updates an item', () => {
        const blazers = {name: 'blaaaazers'};

        let savedTeam = null;

        return request.post('/teams')
            .send(blazers)
            .then(res => savedTeam = res.body)
            .then(() => {
                blazers.name = 'blazers';
                return request
                    .put(`/teams/${savedTeam._id}`)
                    .send( blazers );
            })
            .then( res => {
                assert.deepEqual(res.body.name, 'blazers');
            });

    });

    
});