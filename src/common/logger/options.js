const { format } = require('winston');
const chalk = require('chalk');
const { combine, errors, printf } = format;
const { hidePassword } = require('../utils');

const requestLogConsoleFormat = combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  printf(({ timestamp, message = {} }) => {
    const { method, url, statusCode, duration, body, query } = message;
    const jsonBody = JSON.stringify(hidePassword(body));
    const jsonQuery = JSON.stringify(query);

    return chalk.yellow(
      `[${timestamp}] ${method} ${url} body = ${jsonBody} query = ${jsonQuery} ${statusCode} [${duration}ms]`
    );
  })
);

const requestLogFileFormat = combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  printf(({ timestamp, message = {} }) => {
    const { method, url, statusCode, duration, body, query } = message;
    const jsonBody = JSON.stringify(hidePassword(body));
    const jsonQuery = JSON.stringify(query);

    return `[${timestamp}] ${method} ${url} body = ${jsonBody} query = ${jsonQuery} ${statusCode} [${duration}ms]`;
  })
);

const errorLogConsoleFormat = combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  errors(),
  printf(({ timestamp, message }) => chalk.red(`[${timestamp}] ${message}`))
);

const errorLogFileFormat = combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  errors(),
  printf(({ timestamp, message }) => `[${timestamp}] ${message}`)
);

const exceptionLogConsoleFormat = combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  errors(),
  printf(({ timestamp, message }) => chalk.magenta(`[${timestamp}] ${message}`))
);

const exceptionLogFileFormat = combine(
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  errors(),
  printf(({ timestamp, message }) => `[${timestamp}] ${message}`)
);

module.exports = {
  requestLogConsoleFormat,
  requestLogFileFormat,
  errorLogConsoleFormat,
  errorLogFileFormat,
  exceptionLogConsoleFormat,
  exceptionLogFileFormat
};
