const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const DEFAULT_SALT_ROUNDS = 10;
  const hash = await bcrypt.hash(password, DEFAULT_SALT_ROUNDS);

  return hash;
}

async function checkPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function hidePassword(obj) {
  if (!obj.password) {
    return obj;
  }

  const password = obj.password.replace(/./g, '*');

  return { ...obj, password };
}

module.exports = { hidePassword, hashPassword, checkPassword };
