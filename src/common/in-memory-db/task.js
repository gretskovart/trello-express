const DB = require('./db');

const getAllTasks = async id => {
  const tasks = [...DB.task].filter(item => item.boardId === id);

  if (!tasks) {
    return null;
  }

  return tasks;
};

const getTask = async (boardId, taskId) => {
  const task = [...DB.task].filter(
    item => item.boardId === boardId && item.id === taskId
  )[0];

  if (!task) {
    return null;
  }

  return task;
};

const createTask = async task => {
  DB.task.push(task);

  return getTask(task.boardId, task.id);
};

const updateTask = async (boardId, taskId, updates) => {
  const index = DB.task.findIndex(
    item => item.boardId === boardId && item.id === taskId
  );

  if (index === -1) {
    return null;
  }

  DB.task[index] = { ...DB.task[index], ...updates };
  return getTask(boardId, taskId);
};

const removeTask = async (boardId, taskId) => {
  const index = DB.task.findIndex(
    item => item.boardId === boardId && item.id === taskId
  );

  if (index === -1) {
    return null;
  }

  return DB.task.splice(index, 1);
};

const reassignedUser = async userId => {
  DB.task.forEach((item, index) => {
    if (item.userId === userId) {
      DB.task[index].userId = null;
    }
  });
};

const removeBoardTasks = boardId => {
  DB.task = DB.task.filter(item => item.boardId !== boardId);
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask,
  reassignedUser,
  removeBoardTasks
};
