const createError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');
const User = require('./user.model');

const getAll = async () => User.find({});
const get = async id => {
  const user = await User.findById(id);

  if (!user) {
    throw createError(NOT_FOUND, `Error: user with id: ${id} was not found!`);
  }

  return user;
};
const create = async user => User.create(user);
const update = async (id, updates) => {
  const user = await User.findByIdAndUpdate(id, updates, { lean: true });

  if (!user) {
    throw createError(NOT_FOUND, `Error: user with id: ${id} was not found!`);
  }

  return user;
};
const remove = async id => {
  const success = await User.findByIdAndRemove(id);

  if (!success) {
    throw createError(NOT_FOUND, `Error: user with id: ${id} was not found!`);
  }
};

module.exports = { getAll, get, create, update, remove };
