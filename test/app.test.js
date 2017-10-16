const mongodb = require('../lib/mongodb');
const request = require('./request');
const {assert} = require('chai');
require('dotenv').config();

const errlog = require('./dev-util/errlog');


const items = [
    { name: 'ATP Synthase', molecular_weight: '600000 Da' },
    { name: 'kinesin', molecular_weight: '380000 Da' },
    { name: 'dynein', molecular_weight: '520 Da' }
];


describe('Protein database api', () => {

    // FUNCTIONS IN IN OTHER FILES:
    // --------------------------------
    // - db.js
    //   - BEFORE: mongodb connect
    //   - AFTER: mongodb close
    // 
    // - request.js
    //   - AFTER: server close


    describe('POST', () => {
        it('saves an object to the database', () => {
            return request.post('/proteins')
                .send(JSON.stringify(items))
                .set('Accept', 'application/json')
                .then(res => {
                    const savedItems = JSON.parse(res.text);
                    assert.deepEqual(savedItems[0], { name: 'ATP Synthase', molecular_weight: '600000 Da', _id: savedItems[0]._id });
                    assert.deepEqual(savedItems[1], { name: 'kinesin', molecular_weight: '380000 Da', _id: savedItems[1]._id });
                    assert.deepEqual(savedItems[2], { name: 'dynein', molecular_weight: '520 Da', _id: savedItems[2]._id });
                });
        });
    });

    describe('GET', () => {

        it('returns all items in database as an array', () => {
            return request.get('/proteins')
                .then(output => {
                    output = JSON.parse(output.text);
                    assert.ok(output instanceof Array);
                });
        });

        it('returns item with the supplied id', () => {
            return request.post('/proteins')
                .send({ 'name': 'Human Carbonic Anhydrase II', 'molecular weight': '29200 Da' })
                .set('Accept', 'application/json')
                .then(res => {
                    const saved = JSON.parse(res.text);
                    return request.get(`/proteins/:${saved[0]._id}`)
                        .then(getRes => {
                            const gotten = JSON.parse(getRes.text);
                            assert.deepEqual(gotten[0], { 'name': 'Human Carbonic Anhydrase II', 'molecular weight': '29200 Da', _id: saved[0]._id });
                        });
                });
        });

        it('returns 404 when given an invalid id', () => {
            return request.post('/proteins')
                .send({ 'name': 'Human Carbonic Anhydrase II', 'molecular weight': '29200 Da' })
                .set('Accept', 'application/json')
                .then(res => {
                    const saved = JSON.parse(res.text);
                    return request.get(`/proteins/:badID`)
                        .then(getRes => {
                            assert.ok(false);
                        })
                        .catch(err => {
                            const gotten = JSON.parse(err.status);
                            assert.equal(err.status, 404);
                        });
                });
        });

        it('returns 404 when given a nonexistant id', () => {
            return request.post('/proteins')
                .send({ 'name': 'Human Carbonic Anhydrase II', 'molecular weight': '29200 Da' })
                .set('Accept', 'application/json')
                .then(() => {
                    return request.get('/proteins/:111111111111111111111110')
                        .then(() => {
                            assert.ok(false);
                        })
                        .catch(err => {
                            assert.equal(err.status, 404);
                        });
                });
        });
    });
            
    describe('DELETE', () => {
        it('removes the item with the given id', () => {
            return request.post('/proteins')
                .send({ 'name': 'Cytochrome C Oxidase', 'molecular weight': '200000 Da'})
                .set('Accept', 'application/json')
                .then(posted => {
                    const {_id} = JSON.parse(posted.text)[0];
                    return request.del(`/proteins/:${_id}`)
                        .then(status => {
                            errlog('app.test', 'deletion status', status.text);
                            assert.deepEqual(JSON.parse(status.text), {removed: true});

                            return request.get(`/proteins/:${_id}`)
                                .then(() => {
                                    assert.ok(false);
                                })
                                .catch(err => {
                                    assert.equal(err.status, 404);
                                });
                        });
                });
        }); 
                
        it('returns {removed: false} when given a nonexistant id', () => {
            const id = 'badID'
            return request.del(`/proteins/:${id}`)
                .then(status => {
                    errlog('app.test', 'deletion status', status.text);
                    assert.deepEqual(JSON.parse(status.text), {removed: false});
                });
        });
    });
});