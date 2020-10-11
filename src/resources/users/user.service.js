const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const create = user => usersRepo.create(user);
const update = (id, updates) => usersRepo.update(id, updates);
const remove = id => usersRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
