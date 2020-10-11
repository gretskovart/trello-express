const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.send(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.get(id);

    res.send(User.toResponse(user));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const { login, password, name } = req.body;
  const user = await usersService.create(new User({ login, password, name }));

  res.send(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  try {
    const { login, password, name } = req.body;
    const { id } = req.params;
    const user = await usersService.update(id, { login, password, name });

    res.send(User.toResponse(user));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    await usersService.remove(id);
    await tasksService.reassigned(id);

    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
