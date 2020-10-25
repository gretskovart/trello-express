const createError = require('http-errors');
const { BAD_REQUEST } = require('http-status-codes');
const Task = require('./task.model');
const tasksRepo = require('./task.db.repository');

const getAll = id => tasksRepo.getAll(id);
const get = (boardId, taskId) => tasksRepo.get(boardId, taskId);
const create = (boardId, { title, order, description, userId, columnId }) => {
  if (typeof title === 'undefined' || !title.length) {
    throw createError(BAD_REQUEST, "Error: task's title is not set!");
  } else if (typeof order !== 'number') {
    throw createError(
      BAD_REQUEST,
      "Error: task's order is not set or is not a number!"
    );
  } else if (typeof description === 'undefined' || !description.length) {
    throw createError(
      BAD_REQUEST,
      "Error: task's description is not set or is not a number!"
    );
  }

  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });

  return tasksRepo.create(task);
};
const update = (
  boardId,
  taskId,
  { title, order, description, userId, columnId }
) => {
  if (typeof title === 'undefined' || !title.length) {
    throw createError(BAD_REQUEST, "Error: task's title is not set!");
  } else if (typeof order !== 'number') {
    throw createError(
      BAD_REQUEST,
      "Error: task's order is not set or is not a number!"
    );
  } else if (typeof description === 'undefined' || !description.length) {
    throw createError(
      BAD_REQUEST,
      "Error: task's description is not set or is not a number!"
    );
  }

  const task = {
    title,
    order,
    description,
    userId,
    columnId
  };

  return tasksRepo.update(boardId, taskId, task);
};
const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);
const reassigned = userId => tasksRepo.reassigned(userId);
const removeAll = boardId => tasksRepo.removeAll(boardId);

module.exports = { getAll, get, create, update, remove, reassigned, removeAll };
