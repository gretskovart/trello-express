const Board = require('../../resources/boards/board.model');

const boards = [
  new Board({
    title: 'First Project',
    columns: [
      { title: 'Development Backlog', order: 1 },
      { title: 'In Progress', order: 2 },
      { title: 'Ready on production', order: 3 }
    ]
  }),
  new Board({
    title: 'Second Project',
    columns: [
      { title: 'Development Backlog', order: 1 },
      { title: 'In Progress', order: 2 },
      { title: 'Ready on production', order: 3 }
    ]
  }),
  new Board({
    title: 'Third Project',
    columns: [
      { title: 'Development Backlog', order: 1 },
      { title: 'In Progress', order: 2 },
      { title: 'Ready on production', order: 3 }
    ]
  })
];

module.exports = boards;
