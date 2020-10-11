const DB = require('../../common/in-memory-db');

const getAll = async id => DB.getAllTasks(id);
const get = async (boardId, taskId) => DB.getTask(boardId, taskId);
const create = async user => DB.createTask(user);
const update = async (boardId, taskId, updates) =>
  DB.updateTask(boardId, taskId, updates);
const remove = async id => DB.removeTask(id);

module.exports = { getAll, get, create, update, remove };
