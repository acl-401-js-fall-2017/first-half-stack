// const parseUrl = require('./utils/parseURL');
const bodyParser = require('body-parser');
// const teams = require('./routes/sports');
const express = require('express');
const app = express();

app.use(bodyParser.json());

const teams = require('./routes/sports');
app.use(teams);

module.exports = app; 


// module.exports = (req, res)  => {
//     req.requested = parseUrl(req.url);
//     bodyParser(req)
//         .then(body =>{
//             req.body = body;
//             const route = routes[req.requested.route];
//             route(req, res);
//         });
// };