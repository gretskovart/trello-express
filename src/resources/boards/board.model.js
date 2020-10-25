const mongoose = require('mongoose');
const uuid = require('uuid');

const columnSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number
  },
  { versionKey: false }
);

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [columnSchema]
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title } = board;
  const columns = board.columns.map(it => ({
    order: it.order,
    title: it.title
  }));

  return { id, title, columns };
};

boardSchema.statics.fromRequest = board => {
  const columns = board.columns.map(({ id, ...column }) => ({
    _id: id,
    ...column
  }));

  return { ...board, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
