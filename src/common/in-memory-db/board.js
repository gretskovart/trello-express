const DB = require('./db');

const getAllBoards = async () => [...DB.board];

const getBoard = async id => {
  const board = [...DB.board].filter(item => item.id === id)[0];

  if (!board) {
    return null;
  }

  return board;
};

const createBoard = async board => {
  DB.board.push(board);
  return getBoard(board.id);
};

const updateBoard = async (id, { columns, ...updates }) => {
  const index = DB.board.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  const columnIndex = DB.board[index].columns.findIndex(
    item => item.id === columns[0].id
  );

  if (columnIndex === -1) {
    return null;
  }

  DB.board[index] = {
    ...DB.board[index],
    ...updates,
    columns: [
      ...DB.board[index].columns.slice(0, columnIndex),
      columns[0],
      ...DB.board[index].columns.slice(columnIndex + 1)
    ]
  };

  return getBoard(id);
};

const removeBoard = async id => {
  const index = DB.board.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  return DB.board.splice(index, 1);
};

const getBoardsIds = async () => [...DB.board].map(it => it.id);

const getColumnsIds = async boardId => {
  const index = DB.board.findIndex(item => item.id === boardId);

  if (index === -1) {
    return null;
  }

  return [...DB.board][index].columns.map(it => it.id);
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
  getBoardsIds,
  getColumnsIds
};
