const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN
} = require('http-status-codes');
const logger = require('./logger');
const errorLogger = logger.get('errorLogger');
const exceptionLogger = logger.get('exceptionLogger');

process.on('uncaughtException', ({ stack, message }) => {
  exceptionLogger.error(`Uncaught exception: ${stack || message}`);
  exceptionLogger.info('Server is shutting down!');
});

process.on('unhandledRejection', ({ stack, message }) => {
  exceptionLogger.error(`Unhandled exception: ${stack || message}`);
});

function errorLogMiddleware(err, req, res, next) {
  const { statusCode, stack, message } = err;

  if (err instanceof SyntaxError) {
    errorLogger.error(stack || message);
  } else if (
    statusCode === BAD_REQUEST ||
    statusCode === NOT_FOUND ||
    statusCode === FORBIDDEN
  ) {
    errorLogger.error(message);
    res.status(statusCode).send(message);
  } else if (err) {
    errorLogger.error(`Internal Server Error: ${stack || message}`);
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }

  next();
}

module.exports = errorLogMiddleware;
