const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { UNAUTHORIZED } = require('http-status-codes');
const { JWT_SECRET_KEY } = require('./config');

function checkTokenMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return next(createError(UNAUTHORIZED, 'No header!'));
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer') {
    return next(createError(UNAUTHORIZED, 'Bad schema!'));
  }

  try {
    jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return next(createError(UNAUTHORIZED, 'Unauthorized user!'));
  }

  next();
}

module.exports = checkTokenMiddleware;
