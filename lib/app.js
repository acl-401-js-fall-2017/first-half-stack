// const express = require('express');
// const path = require('path');
// const app = express();
// const bodyParser = require('./utils/body-parser');
// // const notFound = require('./utils/not-found');
// const states = require('./routes/states');

// app.use(bodyParser.json);
// app.use('api/states', states);



// module.exports = app;

const parseUrl = require('./utils/parse-url');
const bodyParser = require('./utils/body-parser');
const notFound = require('./utils/not-found');
const states = require('./routes/states');

const routes = {
    states
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

