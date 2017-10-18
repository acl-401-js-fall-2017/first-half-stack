module.exports = function(req) {
    let body = '';

    return new Promise((resolve, reject) => {
        req.on('data', data => {
            body += data;
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            }
            catch(err) {
                reject(err);
            }
        });
        req.on('error', reject);
    });
};