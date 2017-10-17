const Router = require('express').Router;
const router = new Router();

router
    .get('./', (req, res) => {
        res.send([{ fruit: 'banana' }, { fruit: 'apple' }]);
    })

    .get('./:id', (req, res) => {
        res.send({ fruit: 'banana'});
    })

    .post('./', (req, res) => {
        res.send(req.body);
    })

    .delete('./:id', (req, res) => {
        res.send({ fruit: 'apple'});
    });