const mongoDb = require('../lib/mongodb');
const request = require('./request');
const {assert} = require('chai');
require('dotenv').config();



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
                    console.log('output 1 in app.test at get.then');
                    output = JSON.parse(output.text);

                    assert.ok(output instanceof Array);
                    console.log(output);
                })
        });
    });

})