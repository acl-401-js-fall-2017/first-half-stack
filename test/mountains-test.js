const chai = require('chai');
const assert = chai.assert;
const mongoConnect = require('../lib/mongoConnect');
const mountains = require('../lib/mountains');

const mongoUrl = 'mongodb://localhost:27017/test';

describe('MountainsDB',() => {
    
    it('detect existing entry in database', () => {
        return mongoConnect.connect(mongoUrl)
            .then( () => {
                let mountains = mongoConnect.db.collection('mountains');
                return mountains.find({name: 'adams'}).toArray();
            })
            .then( (mountain) => {
                console.log('mountain is', mountain);
                assert.deepEqual(mountain, [{
                    '_id' : 1.0,
                    'name' : 'adams'
                }]);
                
            });
    });

    describe('Get method', () => { 

        it('should return an array of all of the resources', () => {
            return mountains.GET()
                .then( (got) => {
                    assert.deepEqual( got, [{_id: 1.0, name: 'adams'}] );
                    mongoConnect.db.close();
                });
        });


    });


    describe.skip('Post method', () => {
        it('should insert argument into the database', () => {
            


        });


    });

});