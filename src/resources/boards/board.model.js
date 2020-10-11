const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title, order }) {
    this.id = id;

    this.title = title;
    this.order = order;
  }
}

class User {
  constructor({
    id = uuid(),
    title = 'New board',
    columns = [
      { id: uuid(), title: 'Backlog', order: 1 },
      { id: uuid(), title: 'Sprint', order: 2 }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(it => new Column(it));
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = User;
