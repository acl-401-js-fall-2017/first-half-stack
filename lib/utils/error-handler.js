module.exports = (err, req, res) => {
    console.log('ERROR', err);//eslint-disable-line
    res.statusCode = 500;
    res.end(err.message);
};