const http = require('http');
const app = require('./lib/mongodb');
const mongodb = require('./lib/mongodb');

const url = 'mongodb://localhost:27017/altcoins';
mongodb.connect(url)
    .then(() => console.log('mongo connected', url))
    .catch(err => console.log('mongo FAIL', err));

const server = http.createServer();
const port = process.env.port || 3000;

server.listen(port, () => {
    //eslint-disable-next-line
    console.log('server running on', server.address().port);
});