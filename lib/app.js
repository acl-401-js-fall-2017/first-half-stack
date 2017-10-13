const bodyParser = require('./utils/body-parser');
const notFound = require('./utils/not-found');
const parseUrl = require('./utils/parse-url');
const fruits = require('./routes/fruits');

const routes = {
    fruits
};

module.export = (req, res) => {
    req.requested = parseUrl(req.url);
    bodyParser(req)
        .then(body => {
            req.body = body;
            const route = routes[req.requested.route] || notFound;
            route(req, res);
        });
};