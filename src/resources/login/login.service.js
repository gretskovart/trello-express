const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { BAD_REQUEST, FORBIDDEN } = require('http-status-codes');
const { JWT_SECRET_KEY } = require('../../common/config');
const loginRepo = require('./login.db.repository');
const { checkPassword } = require('../../common/utils');

const getUser = async ({ login, password }) => {
  if (typeof login === 'undefined' || !login.length) {
    throw createError(BAD_REQUEST, "Error: user's login is not set!");
  } else if (typeof password === 'undefined' || !password.length) {
    throw createError(BAD_REQUEST, "Error: user's password is not set!");
  }

  const user = await loginRepo.getUser(login);
  const { password: hashedPassword } = user;
  const comparisonPassword = await checkPassword(password, hashedPassword);

  if (!comparisonPassword) {
    throw createError(FORBIDDEN, 'Error: wrong login or password!');
  }

  return user;
};

const signToken = ({ id, login }) => jwt.sign({ id, login }, JWT_SECRET_KEY);

module.exports = { getUser, signToken };
