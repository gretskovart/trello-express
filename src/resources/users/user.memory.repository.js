const createError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');
const DB = require('../../common/in-memory-db');

const getAll = async () => DB.getAllUsers();
const get = async id => {
  const user = await DB.getUser(id);

  if (!user) {
    throw createError(NOT_FOUND, `Error: user with id: ${id} was not found!`);
  }

  return user;
};
const create = async user => DB.createUser(user);
const update = async (id, updates) => {
  const user = await DB.updateUser(id, updates);

  if (!user) {
    throw createError(NOT_FOUND, `Error: user with id: ${id} was not found!`);
  }

  return user;
};
const remove = async id => {
  const success = await DB.removeUser(id);

  if (!success) {
    throw createError(NOT_FOUND, `Error: user with id: ${id} was not found!`);
  }
};

module.exports = { getAll, get, create, update, remove };
