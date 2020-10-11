const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const users = await boardsService.getAll();

  res.send(users.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const { id } = req.params;
    const board = await boardsService.get(id);

    res.json(Board.toResponse(board));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardsService.create(
    new Board({
      title,
      columns: columns.map(it => ({ title: it.title, order: it.order }))
    })
  );

  res.send(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  try {
    const { title, columns } = req.body;
    const { id } = req.params;
    const board = await boardsService.update(id, {
      title,
      columns: columns.map(it => ({
        id: it.id,
        title: it.title,
        order: it.order
      }))
    });

    res.send(Board.toResponse(board));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const { id } = req.params;
    await boardsService.remove(id);
    await tasksService.removeAll(id);

    res.status(204).send();
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
