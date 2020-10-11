const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await taskService.getAll(boardId);

    res.send(tasks.map(Task.toResponse));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:taskId').get(async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    const task = await taskService.get(boardId, taskId);

    res.send(Task.toResponse(task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { boardId } = req.params;
    const { title, order, description, userId, columnId } = req.body;
    const task = await taskService.create(
      new Task({ title, order, description, userId, boardId, columnId })
    );

    res.send(Task.toResponse(task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const { title, order, description, userId, columnId } = req.body;
    const { boardId, taskId } = req.params;
    const task = await taskService.update(boardId, taskId, {
      title,
      order,
      description,
      userId,
      columnId
    });

    res.send(Task.toResponse(task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
