const chai = require('chai');
const assert = chai.assert;
const mongoConnect = require('../lib/mongoConnect');
const mountains = require('../lib/mountains');

const mongoUrl = 'mongodb://localhost:27017/test';

describe('MountainsDB',() => {
    let db = null;
    
    beforeEach( () => {
        return mongoConnect.connect(mongoUrl)
            .then( (_db) => {
                db = _db;
                db.collection('mountains').remove({});
            });
    });

    afterEach( () => {
        return db.collection('mountains').remove({})
            .then( () => {
                console.log('===============');
                console.log(db);
                return db.close();
            } );

    });

    describe('GET & POST method', () => { 

        it('should return an array of all of the POSTed resources', () => {
            const myObject = {_id: 1.0, name: 'adams'};
            return mountains.POST(myObject)
                .then( (a) => {
                    console.log('post return is', a);
                    return mountains.GET();
                })
                .then( (got) => {
                    console.log('got is', got);
                    assert.deepEqual( got, [{_id: 1.0, name: 'adams'}] );
                });
        });

    });
});