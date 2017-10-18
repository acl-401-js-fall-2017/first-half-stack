/********************************************************
 * PURPOSE
 * -------------
 * - set up chai request function with app
 *   - app started up with http server
 *   - server closed after all tests
 * 
 ********************************************************/

const app = require('../lib/app');
const http = require('http');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = http.createServer(app);
chai.use(chaiHTTP);
const request = chai.request(server);

after(() => {
    server.close();
});

module.exports = request;