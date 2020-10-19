const createError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');
const DB = require('../../common/in-memory-db');

const getAll = async () => DB.getAllBoards();
const get = async id => {
  const board = await DB.getBoard(id);

  if (!board) {
    throw createError(
      NOT_FOUND,
      `Error: the board with id: ${id} was not found!`
    );
  }

  return board;
};
const create = async board => DB.createBoard(board);
const update = async (id, updates) => {
  const board = await DB.updateBoard(id, updates);

  if (!board) {
    throw createError(
      NOT_FOUND,
      `Error: the board with id: ${id} or column with id: ${updates.columns[0].id} was not found!`
    );
  }

  return board;
};
const remove = async id => {
  const success = DB.removeBoard(id);

  if (!success) {
    throw createError(
      NOT_FOUND,
      `Error: The board with id: ${id} was not found!`
    );
  }
};

module.exports = { getAll, get, create, update, remove };
