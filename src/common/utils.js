function hidePassword(obj) {
  if (!obj.password) {
    return obj;
  }

  const password = obj.password.replace(/./g, '*');

  return { ...obj, password };
}

module.exports = { hidePassword };
