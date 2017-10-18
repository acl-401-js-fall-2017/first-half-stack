const Router = require('express').Router;
const router = Router();
const mongodb = require('../mongodb');
const errorHandler = require('../utils/error-handler');
const ObjectID = require('mongodb').ObjectID;

router

    .post('/fruits', (req, res) => {
        const fruits = mongodb.db.collection('fruits');
        fruits.insert(req.body)
            .then(res => res.ops[0])
            .then(fruits => res.send(fruits))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/fruits', (req, res) => {
        const fruits = mongodb.db.collection('fruits');
        fruits.find(req.query).fruitArr()
            .then(fruits => res.send(fruits));
        return;
    })

    //  stopped reconfig here
    fruits.findOne({ _id: ObjectID(id) })
        .then(fruit => {
            if (!fruit) {
                res.statusCode = 404;
                res.end(JSON.stringify({
                    error: `id ${id} does not exist`
                }));
                return;
            }
            res.end(JSON.stringify(fruit));
        })
        .catch(err => errorHandler(err, req, res));
},

DELETE(req, res) {
    const id = req.requested.params.id;

    if (!id) {
        res.statusCode = 400;
        res.end(JSON.stringify({
            error: 'DELETE called with no id'
        }));
        return;
    }

    const fruits = mongodb.db.collection('fruits');
    fruits.removeOne({ _id: ObjectID(id) })
        .then(result => {
            const status = {
                removed: result.deletedCount === 1
            };
            res.end(JSON.stringify(status));
        })
        .catch(err => errorHandler(err, req, res));
}
};

module.exports = router;