require('dotenv').config();

const http = require('http');
const app = require('./lib/app');
const mongodb = require('./lib/mongodb');
const url = process.env.MONGODB_URI;


mongodb.connect(url)
    .then(() => console.log('mongo connected', url))    //eslint-disable-line
    .catch((err) => console.log('error detected',err)); //eslint-disable-line

const server = http.createServer(app);
const PORT = process.env.port || 3000;

server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);      //eslint-disable-line
});
