const createError = require('http-errors');
const { FORBIDDEN } = require('http-status-codes');
const User = require('../users/user.model');

const getUser = async login => {
  const user = await User.findOne({ login });

  if (!user) {
    throw createError(FORBIDDEN, 'Error: wrong login or password!');
  }

  return user;
};

module.exports = { getUser };
