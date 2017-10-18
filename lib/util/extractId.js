const errlog = require('../../test/dev-util/errlog');

module.exports = req => {
    
    let id = req.url.split('/')[2] || null;

    if(id === null) return null;
    return id.charAt(0) === ':' ? id.slice(1) : null;
};