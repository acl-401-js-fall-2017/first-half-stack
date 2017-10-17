const Router = require('express').Router;
const router = Router();

router
    .get('/', (req, res)  => { 
        res.send([{ name: 'banana'}, {name: 'apple'}]);
    })

    .get('/:id', (req, res) => {
        res.send( { name: 'banana'});
    })

    .post('/', (req, res) => {
        res.send(req.body);
    })

    .delete('/:id', (req, res) => {
        res.send( {name: 'apple'});
    });

module.exports = router;