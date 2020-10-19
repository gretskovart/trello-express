const router = require('express').Router();
const { NO_CONTENT } = require('http-status-codes');
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await boardsService.getAll();

  res.send(users.map(Board.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await boardsService.get(id);

    res.json(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardsService.create(req.body);

    res.send(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await boardsService.update(id, req.body);

    res.send(Board.toResponse(board));
  } catch (error) {
    return next(error);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    await boardsService.remove(id);
    await tasksService.removeAll(id);

    res.status(NO_CONTENT).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
