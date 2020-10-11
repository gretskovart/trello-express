const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = user => tasksRepo.create(user);
const update = (boardId, taskId, updates) =>
  tasksRepo.update(boardId, taskId, updates);
const remove = id => tasksRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
