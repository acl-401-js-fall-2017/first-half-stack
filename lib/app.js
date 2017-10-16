const parseUrl = require('./utils/parse-url');
const bodyParser = require('./utils/body-parser');
const notFound = require('./utils/not-found');
const mountains = require('./routes/mountains');

const routes = {
    mountains
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