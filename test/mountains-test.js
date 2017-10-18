const request = require('./request');
const mongodb = require('../lib/mongodb');
const assert = require('chai').assert;

describe('mountain api', () => {

    beforeEach( () => {
        mongodb.db.dropDatabase();
    });

    it('saves with id', () => {
        const doom = {name: 'doom'};
        return request.post('/mountains')
            .send(doom)
            .then( res => {
                const mountain = res.body;
                assert.ok(mountain._id);
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

    it('updates by id', () => {
        const doom = {name: 'doom'};
        const updateProp = {volcano: 'maybe'};
        let mountain = null;

        return request.post('/mountains')
            .send(doom)
            .then( res => {
                mountain = res.body;
                return request.put(`/mountains/${mountain._id}`)
                    .send(updateProp);
            })
            .then( () => {
                return request.get(`/mountains/${mountain._id}`);
            })
            .then ( res => {
                assert.equal(res.body.volcano, 'maybe');
            });
    });

    it('returns error when updating to fake id', () => {
        return request.put('/mountains/sdlkghlksdg')
            .then( 
                () => {throw new Error('unexpected successful response');},
                error => {
                    assert.equal(error.status, 404);
                });
    });

    it('get by id returns 404 for bad id', () => {
        return request.get('/mountains/59e5027e2c019dc4ce62958c')
            .then(
                () => { throw new Error('unexpected successful response');},
                error => {
                    assert.equal(error.status, 404);
                }
            );
    });

    it('delete by id', () => {
        const mountain = {name:'doom'};
        let mountains = null;
        return request.post('/mountains')
            .send(mountain)
            .then( (res) => {
                mountains = res.body;
                return request.delete(`/mountains/${mountains._id}`);
            })
            .then(res=> {
                assert.deepEqual(res.body, {removed: true});
                return request.get(`/mountains/${mountains._id}`);
            })
            .then(
                () => { throw new Error('unexpected successful response');},
                error => {
                    assert.equal(error.status, 404);
                }
            );
    });

    it('Gets all', () => {
        const mountains = [{name:'doom'}, {name: 'pompei'}];
        const posts = mountains.map((mountain)=>{
            return request.post('/mountains')
                .send(mountain)
                .then( (res) => res.body);
        });
        let saved = null;
        return Promise.all(posts)
            .then((_saved)=> {
                saved = _saved;
                return request.get('/mountains');
            })
            .then((res) => {
                assert.deepEqual(res.body, saved);
            });
    }),


    it('get all by query', () => {
        const mountain = [
            {name:'doom', good:'yes'},
            {name:'john madden', good:'no'},
            {name:'burd', good:'yes'}
        ];

        const allPosts = mountain.map(a => {
            return request.post('/mountains')
                .send(a)
                .then( (res) => res.body);
        });

        return Promise.all(allPosts)
            .then( () => {
                return request.get('/mountains?good=yes');
            })
            .then( (got) => {
                got.body.forEach(a => {
                    assert.equal(a.good, 'yes');
                });
            });

    });


});