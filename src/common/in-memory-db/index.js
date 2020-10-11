const user = require('./user');
const board = require('./board');
const task = require('./task');

module.exports = { ...user, ...board, ...task };
