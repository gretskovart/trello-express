const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = task => tasksRepo.create(task);
const update = (boardId, taskId, updates) =>
  tasksRepo.update(boardId, taskId, updates);
const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);
const reassigned = userId => tasksRepo.reassigned(userId);
const removeAll = boardId => tasksRepo.removeAll(boardId);

module.exports = { getAll, get, create, update, remove, reassigned, removeAll };
