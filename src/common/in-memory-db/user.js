const DB = require('./db');

const getAllUsers = async () => [...DB.user];

const getUser = async id => {
  const user = [...DB.user].filter(item => item.id === id)[0];

  return user;
};

const createUser = async user => {
  DB.user.push(user);
  return getUser(user.id);
};

const updateUser = async (id, updates) => {
  const index = DB.user.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  DB.user[index] = { ...DB.user[index], ...updates };

  return getUser(id);
};

const removeUser = async id => {
  const index = DB.user.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  return DB.user.splice(index, 1);
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
