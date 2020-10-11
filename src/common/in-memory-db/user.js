const DB = require('./db');

const getAllUsers = async () => [...DB.user];

const getUser = async id => {
  const user = [...DB.user].filter(item => item.id === id)[0];

  if (!user) {
    throw new Error(`The user with id: ${id} was not found!`);
  }

  return user;
};

const createUser = async user => {
  DB.user.push(user);
  return getUser(user.id);
};

const updateUser = async (id, updates) => {
  const index = DB.user.findIndex(item => item.id === id);

  if (index === -1) {
    throw new Error(`The user with id: ${id} was not found!`);
  }

  DB.user[index] = { ...DB.user[index], ...updates };

  return getUser(id);
};

const removeUser = async id => {
  const index = DB.user.findIndex(item => item.id === id);

  if (index === -1) {
    throw new Error(`The user with id: ${id} was not found!`);
  }

  DB.user.splice(index, 1);
};

const getUsersIds = async () => [...DB.user].map(it => it.id);

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  getUsersIds
};
