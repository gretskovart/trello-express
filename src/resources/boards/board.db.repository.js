const createError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');
const Board = require('./board.model');

const getAll = async () => Board.find({});
const get = async id => {
  const board = await Board.findById(id);

  if (!board) {
    throw createError(
      NOT_FOUND,
      `Error: the board with id: ${id} was not found!`
    );
  }

  return board;
};
const create = async board => Board.create(board);
const update = async (id, updates) => {
  const board = await Board.findByIdAndUpdate(
    id,
    { $set: Board.fromRequest(updates) },
    {
      new: true
    }
  );

  if (!board) {
    throw createError(
      NOT_FOUND,
      `Error: the board with id: ${id} was not found!`
    );
  }

  return board;
};
const remove = async id => {
  const success = await Board.findByIdAndRemove(id);

  if (!success) {
    throw createError(
      NOT_FOUND,
      `Error: The board with id: ${id} was not found!`
    );
  }
};

module.exports = { getAll, get, create, update, remove };
