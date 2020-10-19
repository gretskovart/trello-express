const router = require('express').Router();
const { NO_CONTENT } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.send(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.get(id);

    res.send(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.create(req.body);

    res.send(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.update(id, req.body);

    res.send(User.toResponse(user));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    await usersService.remove(id);
    await tasksService.reassigned(id);

    res.status(NO_CONTENT).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
