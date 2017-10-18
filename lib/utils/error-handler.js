module.exports = (err, req, res) => {
    console.log('here is error message', err); // eslint-disable-line
    res.statusCode = 500;
    res.end(err.message);
};