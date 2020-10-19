function getRandomItemFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function hidePassword(obj) {
  if (!obj.password) {
    return obj;
  }

  const password = obj.password.replace(/./g, '*');

  return { ...obj, password };
}

module.exports = { getRandomItemFromArray, hidePassword };
