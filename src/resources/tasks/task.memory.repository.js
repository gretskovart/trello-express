const DB = require('../../common/in-memory-db');

const getAll = async id => DB.getAllTasks(id);
const get = async (boardId, taskId) => DB.getTask(boardId, taskId);
const create = async task => DB.createTask(task);
const update = async (boardId, taskId, updates) =>
  DB.updateTask(boardId, taskId, updates);
const remove = async (boardId, taskId) => DB.removeTask(boardId, taskId);
const reassigned = async userId => DB.reassignedUser(userId);
const removeAll = async boardId => DB.removeBoardTasks(boardId);

module.exports = { getAll, get, create, update, remove, reassigned, removeAll };
