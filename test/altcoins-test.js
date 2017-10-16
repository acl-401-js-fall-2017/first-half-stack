const request = require('./request');
const mongodb = require('../lib/mongodb');
const assert = require('chai').assert;

describe('altcoins API', () => {
    
    beforeEach(() => mongodb.db.dropDatabase());

    it.skip('saves with id', () => {
        const ethereum = { name: 'Ethereum', ticker: 'ETH'};
        return request.post('/altcoins')
            .send(ethereum)
            .then(res => {
                const altcoin = res.body;
                assert.ok(altcoin._id,'Missing Id');
                assert.equal(altcoin.name, ethereum.name);
            });
    });
});