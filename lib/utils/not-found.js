
module.exports = function notFound(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 404;
    res.end('Error 404 there is no tree');
};