const mongoDb = require('./mongodb');
const request = require('./request');
const {assert} = require('chai');


describe('Protein database api', () => {

    // FUNCTIONS IN IN OTHER FILES:
    // --------------------------------
    // - db.js
    //   - BEFORE: mongodb connect
    //   - AFTER: mongodb close
    // 
    // - request.js
    //   - AFTER: server close

    describe('get method', () => {
        it('returns all items in database as an array', () => {
            return request.get('/proteins')
                .then(output => {
                    assert.ok(output instanceof Array);
                    console.log(output);
                })
        });
    });

})