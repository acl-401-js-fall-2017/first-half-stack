const mongodb = require('../lib/mongodb');
const request = require('./request');
const assert = require('chai').assert;

describe('fruits API', () => {

    beforeEach(() => mongodb.db.dropDatabase());

    it('save with id', () => {
        const fruit = {name: 'banana', color: 'yellow'};
        return request.post('/fruits')
            .send(fruit)
            .then(res => {
                const fruitBasket = res.body;
                assert.ok(fruitBasket._id, 'missing id');
                assert.equal(fruitBasket.name, fruit.name);
            });
    });
});