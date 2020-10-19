const createError = require('http-errors');
const { BAD_REQUEST } = require('http-status-codes');
const Board = require('./board.model');
const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = ({ title, columns }) => {
  if (typeof title === 'undefined' || !title.length) {
    throw createError(BAD_REQUEST, "Error: board's title is not set!");
  } else if (!Array.isArray(columns) || columns.length === 0) {
    throw createError(BAD_REQUEST, "Error: board's columns are not set!");
  }

  const board = new Board({
    title,
    columns: columns.map(it => {
      if (typeof it.title === 'undefined' || !it.title) {
        throw createError(BAD_REQUEST, "Error: column's title is not set!");
      } else if (typeof it.order !== 'number') {
        throw createError(
          BAD_REQUEST,
          "Error: column's order is not set or is not a number!"
        );
      }

      return { title: it.title, order: it.order };
    })
  });

  return boardsRepo.create(board);
};
const update = (id, { title, columns }) => {
  if (typeof title === 'undefined' || !title.length) {
    throw createError(BAD_REQUEST, "Error: board's title is not set!");
  } else if (!Array.isArray(columns) || columns.length === 0) {
    throw createError(BAD_REQUEST, "Error: board's columns are not set!");
  }

  const board = {
    title,
    columns: columns.map(it => {
      if (typeof it.title === 'undefined' || !it.title) {
        throw createError(BAD_REQUEST, "Error: column's title is not set!");
      } else if (typeof it.order !== 'number') {
        throw createError(
          BAD_REQUEST,
          "Error: column's order is not set or is not a number!"
        );
      }

      return {
        id: it.id,
        title: it.title,
        order: it.order
      };
    })
  };

  return boardsRepo.update(id, board);
};
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
