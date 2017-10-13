const parsedUrl = require('url').parse;

module.exports = function parsedPath(urlPath) {
    const parsed = parsedUrl(urlPath, true);
    const parts = parsed.pathname.slice(1).split('/');

    return {
        path: urlPath,
        route: parts[0],
        query: parsed.query,
        params: {
            id: parts[1]
        }
    };
};