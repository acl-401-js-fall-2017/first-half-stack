const http = require('http');
const app = require('./lib/app');
const mongodb = require('./lib/mongodb');

const url = 'mongodb://localhost:27017/mountains';
mongodb.connect(url)
    .then(()=> console.log('mongo connected', url) )
    .catch((err)=> console.log('mongo failed with:',err));

const server = http.createServer(app);
const port = process.env.port || 3000;

server.listen(port, () => {
    console.log('server is running on:', server.address().port);
});


app.get('/mewmew',(req,res))