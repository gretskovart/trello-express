const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Create an Express app',
    order = '1',
    description = 'For User, Board and Task REST endpoints with separate router paths should be created.',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;

    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
