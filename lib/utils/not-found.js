module.exports = function notFound(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404;

    res.end();
};
