const { finished } = require('stream');
const requestLogger = require('./logger').get('requestLogger');

function requestLogMiddleware(req, res, next) {
  const start = Date.now();

  finished(res, () => {
    const { method, protocol, hostname, originalUrl, body, query } = req;
    const { statusCode } = res;
    const url = `${protocol}://${hostname}${originalUrl}`;
    requestLogger.http({
      method,
      url,
      statusCode,
      body,
      query,
      duration: Date.now() - start
    });
  });
  return next();
}

module.exports = requestLogMiddleware;
