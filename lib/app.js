const proteins = require('./routes/proteins');
const bodyParser = require('./util/bodyParser');

const routes = {
    proteins
};

module.exports = (req, res) => {
    const collection = req.url.split('/')[1];
    routes[collection](req, res);
    
};