const { transports, Container } = require('winston');
const {
  requestLogConsoleFormat,
  requestLogFileFormat,
  errorLogConsoleFormat,
  errorLogFileFormat,
  exceptionLogConsoleFormat,
  exceptionLogFileFormat
} = require('./options');

const loggerContainer = new Container();

const MAX_SIZE = 5242880; // 5MB
const MAX_FILES = 5;

loggerContainer.add('requestLogger', {
  transports: [
    new transports.File({
      level: 'http',
      format: requestLogFileFormat,
      filename: 'logs/request.log',
      maxsize: MAX_SIZE,
      maxFiles: MAX_FILES
    }),
    new transports.Console({
      level: 'http',
      format: requestLogConsoleFormat
    })
  ]
});

loggerContainer.add('errorLogger', {
  transports: [
    new transports.File({
      level: 'error',
      format: errorLogFileFormat,
      filename: 'logs/error.log',
      maxsize: MAX_SIZE,
      maxFiles: MAX_FILES
    }),
    new transports.Console({
      level: 'error',
      format: errorLogConsoleFormat
    })
  ],
  exitOnError: false
});

loggerContainer.add('exceptionLogger', {
  transports: [
    new transports.File({
      format: exceptionLogFileFormat,
      filename: 'logs/exceptions.log',
      maxsize: MAX_SIZE,
      maxFiles: MAX_FILES
    }),
    new transports.Console({
      format: exceptionLogConsoleFormat
    })
  ],
  exitOnError: false
});

module.exports = loggerContainer;
