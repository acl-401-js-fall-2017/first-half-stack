module.exports = (err, req, res) => {
    // eslint-disable-next-line
    console.log('I AM ERROR', err);
    res.statusCode = 500;
    res.end(err.message);
};