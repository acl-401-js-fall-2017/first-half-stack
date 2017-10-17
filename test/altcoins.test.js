const request = require('./request');
const mongodb = require('../lib/mongodb');
const assert = require('chai').assert;

describe('altcoins API', () => {
    
    beforeEach(() => mongodb.db.dropDatabase());

    it('saves with id', () => {
        const ethereum = { name: 'Ethereum', ticker: 'ETH'};
        return request.post('/altcoins')
            .send(ethereum)
            .then(res => {
                const altcoin = res.body;
                assert.ok(altcoin._id,'Missing Id');
                assert.equal(altcoin.name, ethereum.name);
            });
    });

    it('get by id', () => {
        const ethereum = { name: 'Ethereum', ticker: 'ETH'};
        let altcoin = null;
        return request.post('/altcoins')
            .send(ethereum)
            .then(res => {
                altcoin = res.body;
                return request.get(`/altcoins/${altcoin._id}`);

            });
    });

    it('get by id returns 404 for bad id', () => {
        return request.get('/altcoins/3af02d47a236a4f2a32f4a5a')
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);
                }
            );
    });

    it('delete by id', () => {
        const ethereum = { name: 'Ethereum', ticker: 'ETH'};
        let altcoin = null;
        return request.post('/a')
            .send(ethereum)
            .then(res => {
                altcoin = res.body;
                return request.delete(`/altcoins/${altcoin._id}`);
            })
            .then(res => {
                assert.deepEqual(res.body, { removed: true });
                return request.get(`/altcoins/${altcoin._id}`);                
            })
            .then(
                () => { throw new Error('Unexpected successful response'); },
                err => {
                    assert.equal(err.status, 404);    
                }
            );
    });

    it('gets all altcoins', () => {
        const altcoins = [
            { name: 'Ethereum', ticker: 'ETH' },
            { name: 'Litecoin', ship: 'LTC' }
        ];

        const posts = altcoins.map(altcoin => {
            return request.post('/altcoins')
                .send(altcoin)
                .then(res => res.body);
        });

        let saved = null;
        return Promise.all(posts)
            .then(_saved => {
                saved = _saved;
                return request.get('/altcoins');
            })
            .then(res => {
                assert.deepEqual(res.body, saved);
            });
    });
});