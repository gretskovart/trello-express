const createError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');
const Task = require('./task.model');

const getAll = async id => {
  const tasks = await Task.find({ boardId: id });

  if (!tasks) {
    throw createError(
      NOT_FOUND,
      `Error: the tasks on board with id: ${id} were not found!`
    );
  }

  return tasks;
};
const get = async (boardId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId });

  if (!task) {
    throw createError(
      NOT_FOUND,
      `Error: the task with id: ${taskId} on board with id: ${boardId} was not found!`
    );
  }

  return task;
};
const create = async task => Task.create(task);
const update = async (boardId, taskId, updates) => {
  const task = await Task.findOneAndUpdate({ _id: taskId, boardId }, updates, {
    new: true
  });

  if (!task) {
    throw createError(
      NOT_FOUND,
      `Error: the task with id: ${taskId} on board with id: ${boardId} was not found!`
    );
  }

  return task;
};
const remove = async (boardId, taskId) => {
  const success = await Task.findOneAndDelete({ _id: taskId, boardId });

  if (!success) {
    throw createError(
      NOT_FOUND,
      `Error: the task with id: ${taskId} on board with id: ${boardId} was not found!`
    );
  }
};
const reassigned = async userId =>
  Task.updateMany({ userId }, { userId: null });
const removeAll = async boardId => Task.deleteMany({ boardId });

module.exports = { getAll, get, create, update, remove, reassigned, removeAll };
