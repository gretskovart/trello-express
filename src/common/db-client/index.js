const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../config');

const users = require('./user');
const boards = require('./board');
const tasks = require('./task');

function connectDB(cb) {
  mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    db.dropDatabase();
    users.forEach(user => user.save());
    boards.forEach(board => board.save());
    tasks.forEach(task => task.save());
    console.log('DB connected!');
    cb();
  });
}

module.exports = { connectDB };
