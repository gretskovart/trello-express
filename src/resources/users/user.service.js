const createError = require('http-errors');
const { BAD_REQUEST } = require('http-status-codes');
const User = require('./user.model');
const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = ({ login, password, name }) => {
  if (typeof name === 'undefined' || !name.length) {
    throw createError(BAD_REQUEST, "Error: user's name is not set!");
  } else if (typeof login === 'undefined' || !login.length) {
    throw createError(BAD_REQUEST, "Error: user's login is not set!");
  } else if (typeof password === 'undefined' || !password.length) {
    throw createError(BAD_REQUEST, "Error: user's password is not set!");
  }

  const user = new User({ login, password, name });

  return usersRepo.create(user);
};
const update = (id, { login, password, name }) => {
  if (typeof name === 'undefined' || !name.length) {
    throw createError(BAD_REQUEST, "Error: user's name is not set!");
  } else if (typeof login === 'undefined' || !login.length) {
    throw createError(BAD_REQUEST, "Error: user's login is not set!");
  } else if (typeof password === 'undefined' || !password.length) {
    throw createError(BAD_REQUEST, "Error: user's password is not set!");
  }

  return usersRepo.update(id, { login, password, name });
};
const remove = id => usersRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
