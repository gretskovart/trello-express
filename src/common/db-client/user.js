const User = require('../../resources/users/user.model');

const users = [
  new User({
    name: 'Michael',
    login: 'mike',
    // qwerty
    password: 'qwerty'
  }),
  new User({
    name: 'Leonardo',
    login: 'leo',
    // 123456
    password: '$2b$10$aCZpCX3ZiT4O3DJTS6DFdu8YLHp1HKlXWn7s2vnL9m01aj4/APN5C'
  }),
  new User({
    name: 'Donatello',
    login: 'don',
    // qazxcdews
    password: '$2b$10$lfyQZXELXMOeV9YrN7UChur1NNrxfPTEJtpimdePitgJD6OieiOEO'
  }),
  new User({
    name: 'admin',
    login: 'admin',
    // admin
    password: '$2b$10$wRLfVhDdpZqVJdm7pgSyOeTHJvWgxkJK1OWIc24Yu.wKovWlRMRia'
  })
];

module.exports = users;
