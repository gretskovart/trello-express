function getRandomItemFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = { getRandomItemFromArray };
