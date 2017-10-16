const mongodb = require('../lib/mongodb');
const request = require('./request');
const assert = require('chai').assert;

describe('fruits API', () => {

    beforeEach(() => mongodb.db.dropDatabase());

    it('save with id', () => {
        const fruit = {name: 'banana', color: 'yellow'};
        let fruitBasket = null;
        return request.post('/fruits')
            .send(fruit)
            .then(res => {
                fruitBasket = res.body;
                assert.ok(fruitBasket._id, 'missing id');
                assert.equal(fruitBasket.name, fruit.name);
            });
    });

    it('returns an array of all objects', () => {
        const fruit = {name: 'banana', color: 'yellow'};
        let fruitBasket = null;

        return request.post('/fruits')
            .send(fruit)
            .then(res => {
                fruitBasket = res.body;
                return request.get(`/fruits/${fruitBasket._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, fruitBasket);
            });
    });

    it('returns 404 if no id found', () => {
        return request.get('/fruits/59e4e2de26e7e01dfad5cb13')
            .then( 
                () => { throw new Error('Unexpected Error');},
                err => {
                    assert.equal(err.status, 404);
                }
            );
    });

    it('delete object by id', () => {
        const fruit = {name: 'banana', color: 'yellow'};
        let fruitBasket = null;

        return request.post('/fruits')
            .send(fruit)
            .then(res => {
                fruitBasket = res.body;
                return request.delete(`/fruits/${fruitBasket._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, {removed: true});
                return request.get(`/fruits/${fruitBasket._id}`);
            })
            .then(
                () => { throw new Error('Unexpected Error');},
                err => {
                    assert.equal(err.status, 404);
                }
            );
    });

    it('gets all fruits', () => {
        const fruit = [
            {name: 'banana', color: 'yellow'},
            {name: 'apple', color: 'red'}
        ];

        const posts = fruit.map(fruit => {
            return request.post('/fruits')
                .send(fruit)
                .then(res => res.body);
        });

        let savedFruits = null;
        return Promise.all(posts)
            .then(_savedFruits => {
                savedFruits = _savedFruits;
                return request.get('/fruits');
            })
            .then( res => {
                assert.deepEqual(res.body, savedFruits);
            });
    });
});