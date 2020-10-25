const Task = require('../../resources/tasks/task.model');

const tasks = [
  new Task({
    title: 'Caesar cipher CLI tool',
    order: 1,
    description:
      'Implement CLI tool that will encode and decode a text by Caesar cipher.'
  }),
  new Task({
    title: 'Express REST service',
    order: 2,
    description:
      'Create an Express application, the application should operate with the following resources.'
  })
];

module.exports = tasks;
