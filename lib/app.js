const parseUrl = require('./utils/parse-url');
const bodyParser = require('./utils/body-parser');
const notFound = require('./utils/not-found');
const states = require('./routes/states');
const countries = require('./routes/countries');

const routes = {
    states,
    countries
};

module.exports = (req, res) => {
    req.requested = parseUrl(req.url);
    bodyParser(req)
        .then(body => {
            req.body = body;
            const route = routes[req.requested.route] || notFound;
            route(req, res);
        });
};

