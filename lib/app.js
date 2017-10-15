const parseUrl = require('./utils/parseURL');
const bodyParser = require('./utils/bodyparser');
const teams = require('./routes/sports');

const routes = {
    teams
};


module.exports = (req, res)  => {
    req.requested = parseUrl(req.url);
    bodyParser(req)
        .then(body =>{
            req.body = body;
            
            const route = routes[req.requested.route];
            route(req, res);
        });
};