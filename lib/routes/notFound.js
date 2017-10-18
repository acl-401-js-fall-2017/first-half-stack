
const errlog = require('../../test/dev-util/errlog');

module.exports = (req, res) => {

    return new Promise((resolve, reject) => {
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 404;
        res.end();
    });
};