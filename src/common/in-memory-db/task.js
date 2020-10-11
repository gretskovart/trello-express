const DB = require('./db');

const getAllTasks = async id => {
  const tasks = [...DB.task].filter(item => item.boardId === id);

  if (!tasks) {
    throw new Error(`The tasks on board with id: ${id} were not found!`);
  }

  return tasks;
};

const getTask = async (boardId, taskId) => {
  const task = [...DB.task].filter(
    item => item.boardId === boardId && item.id === taskId
  )[0];

  if (!task) {
    throw new Error(
      `The task with id: ${taskId} on board with id: ${boardId} was not found!`
    );
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
    throw new Error(
      `The task with id: ${taskId} on board with id: ${boardId} was not found!`
    );
  }

  DB.task[index] = { ...DB.task[index], ...updates };
  return getTask(boardId, taskId);
};

const removeTask = async (boardId, taskId) => {
  const index = DB.task.findIndex(
    item => item.boardId === boardId && item.id === taskId
  );

  if (index === -1) {
    throw new Error(
      `The task with id: ${taskId} on board with id: ${boardId} was not found!`
    );
  }

  DB.task.splice(index, 1);
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
