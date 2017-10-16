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
                return db.close();
            } );

    });

    describe('GET & POST method', () => { 

        it('should return an array of all of the POSTed resources', () => {
            const myObject = {_id: 1.0, name: 'adams'};
            return mountains.POST(myObject)
                .then( () => {
                    return mountains.GET();
                })
                .then( (got) => {
                    assert.deepEqual( got, [{_id: 1.0, name: 'adams'}] );
                });
        });

    });

    describe('GET_id', () => {
        it('should return a single object with that id', () => {
            const myObject1 = {_id: 1.0, name: 'adams'};
            const myObject2 = {_id: 2.0, name: 'doom'};

            return Promise.all ([mountains.POST(myObject1), mountains.POST(myObject2)]) 
                .then(() => mountains.GET_id(1.0))
                .then((got) =>  assert.deepEqual(got,{_id: 1.0, name: 'adams'}));
        });

    });


    describe('DELETE', () => {

      
        it('should DELETE a record with provided id', () =>{
            const myObject = {_id: 1.0, name: 'adams'};
            return mountains.POST(myObject)
                .then( () => mountains.DELETE(1.0) )
                .then( () => mountains.GET())
                .then( (got) => assert.deepEqual(got, [] ) );
        });
    });

    describe('PUT', () => {
       
        it('should update a record with provided change', () =>{
            const myObject = {_id: 1.0, name: 'adams'};
            return mountains.POST(myObject)
                .then( () => mountains.PUT(1.0, {name: 'doom'}) )
                .then( () => mountains.GET())
                .then( (got) => {
                    console.log('should be doom', got);
                    assert.deepEqual(got, [{_id: 1.0, name: 'doom'}] ); 
                });
        });
    });         
});