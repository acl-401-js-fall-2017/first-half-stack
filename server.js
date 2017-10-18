require('dotenv').config();

const http = require('http');
const app = require('./lib/app');
const mongodb = require('./lib/mongodb');
const url = process.env.MONGODB_URI;


mongodb.connect(url)
    .then(() => console.log('mongo connected', url))    //eslint-disable-line
    .catch((err) => console.log('mongo error detected',err)); //eslint-disable-line

const server = http.createServer(app);
const port = process.env.port || 3000;

server.listen(port, () => {
    console.log('server started on port', server.address().port);      //eslint-disable-line
});
