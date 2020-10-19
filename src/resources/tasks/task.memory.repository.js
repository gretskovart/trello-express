const createError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');
const DB = require('../../common/in-memory-db');

const getAll = async id => {
  const tasks = DB.getAllTasks(id);

  if (!tasks) {
    throw createError(
      NOT_FOUND,
      `Error: the tasks on board with id: ${id} were not found!`
    );
  }

  return tasks;
};
const get = async (boardId, taskId) => {
  const task = await DB.getTask(boardId, taskId);

  if (!task) {
    throw createError(
      NOT_FOUND,
      `Error: the task with id: ${taskId} on board with id: ${boardId} was not found!`
    );
  }

  return task;
};
const create = async task => DB.createTask(task);
const update = async (boardId, taskId, updates) => {
  const task = await DB.updateTask(boardId, taskId, updates);

  if (!task) {
    throw createError(
      NOT_FOUND,
      `Error: the task with id: ${taskId} on board with id: ${boardId} was not found!`
    );
  }

  return task;
};
const remove = async (boardId, taskId) => {
  const success = DB.removeTask(boardId, taskId);

  if (!success) {
    throw createError(
      NOT_FOUND,
      `Error: the task with id: ${taskId} on board with id: ${boardId} was not found!`
    );
  }
};
const reassigned = async userId => DB.reassignedUser(userId);
const removeAll = async boardId => DB.removeBoardTasks(boardId);

module.exports = { getAll, get, create, update, remove, reassigned, removeAll };
