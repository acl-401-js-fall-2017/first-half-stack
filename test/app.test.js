const mongoDb = require('../lib/mongodb');
const request = require('./request');
const {assert} = require('chai');
require('dotenv').config();

const errlog = require('./dev-util/errlog');



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
                    output = JSON.parse(output.text);

                    assert.ok(output instanceof Array);
                    errlog('app.test', 'output array', output);
                });
        });
    });

})