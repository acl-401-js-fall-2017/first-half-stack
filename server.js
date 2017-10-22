const http = require('http');
const mongodb = require('./lib/mongodb'); //eslint-disable-line
const app = require('./lib/app');


const server = http.createServer(app);
const port = process.env.port || 3000;

server.listen(port, () => {
    console.log('server running on ', server.address().port); //eslint-disable-line
});