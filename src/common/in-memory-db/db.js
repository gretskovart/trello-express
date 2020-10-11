const User = require('../../resources/users/user.model');
const Board = require('../../resources/boards/board.model');
const Task = require('../../resources/tasks/task.model');
const { getRandomItemFromArray } = require('../utils');

const DB = {
  user: [],
  board: [],
  task: []
};

async function getRandomBoardWithRandomColumn(boardsArr) {
  const { getColumnsIds } = require('./board');
  const boardId = getRandomItemFromArray(boardsArr);
  const columnsIds = await getColumnsIds(boardId);
  const columnId = getRandomItemFromArray(columnsIds);

  return { boardId, columnId };
}

(async () => {
  await DB.user.push(new User(), new User(), new User());
  await DB.board.push(new Board(), new Board(), new Board());

  const { getUsersIds } = require('./user');
  const { getBoardsIds } = require('./board');

  DB.task.push(
    new Task({
      userId: getRandomItemFromArray(await getUsersIds()),
      ...(await getRandomBoardWithRandomColumn(await getBoardsIds()))
    }),
    new Task({
      userId: getRandomItemFromArray(await getUsersIds()),
      ...(await getRandomBoardWithRandomColumn(await getBoardsIds()))
    }),
    new Task({
      userId: getRandomItemFromArray(await getUsersIds()),
      ...(await getRandomBoardWithRandomColumn(await getBoardsIds()))
    })
  );
})();

module.exports = DB;
