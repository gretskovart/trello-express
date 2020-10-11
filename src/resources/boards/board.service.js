const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const create = board => boardsRepo.create(board);
const update = (id, updates) => boardsRepo.update(id, updates);
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
