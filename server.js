const http = require('http');
const app = require('./lib/app');
const {MongoClient} = require('mongodb');
require('dotenv').config();


const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/proteins';

const db = MongoClient.connect(mongoUrl)
    .then(
        () => console.log(`mongo connect: ${mongoUrl}`),
        err => console.log('mongo connect: FAIL')
    );


const port = process.env.port || 8080;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});