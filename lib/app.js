const proteins = require('./routes/proteins');
const notFound = require('./routes/notFound');
const bodyParser = require('./util/bodyParser');

const routes = {
    proteins
};

module.exports = (req, res) => {
    const collection = req.url.split('/')[1];
    const route = routes[collection] || notFound;
    
    route(req, res);
};