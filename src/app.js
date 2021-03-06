const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const createError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');
const requestLogMiddleware = require('./common/request-log-middleware');
const errorLogMiddleware = require('./common/error-log-middleware');
const checkTokenMiddleware = require('./common/check-token-middleware');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(requestLogMiddleware);
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', checkTokenMiddleware, userRouter);
app.use('/boards', checkTokenMiddleware, boardRouter);
boardRouter.use('/:boardId/tasks', checkTokenMiddleware, taskRouter);
app.use('/login', loginRouter);
app.use('*', (req, res, next) =>
  next(createError(NOT_FOUND, 'Error: this route is undefined!'))
);

app.use(errorLogMiddleware);

module.exports = app;
