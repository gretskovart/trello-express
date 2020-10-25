const User = require('../../resources/users/user.model');

const users = [
  new User({ name: 'Michael', login: 'mike', password: 'qwerty' }),
  new User({ name: 'Leonardo', login: 'leo', password: '123456' }),
  new User({ name: 'Donatello', login: 'don', password: 'qazwsx' })
];

module.exports = users;
