/*eslint no-console: "off"*/
const http = require('http'); 
const app = require('./lib/app');
const mongodb = require('./lib/mongodb');

const url = 'mongodb://localhost:27017/altcoins';
mongodb.connect(url)
    .then(() => console.log('mongo connected', url))
    .catch(err => console.log('mongo FAIL', err));

const server = http.createServer(app);
const port = process.env.port || 3000;

server.listen(port, () => {
    console.log('server running on', server.address().port);
});