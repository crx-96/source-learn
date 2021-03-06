/*
 * default-exceptions.js: A test fixture for logging exceptions with the default winston logger.
 *
 * (C) 2011 Charlie Robbins
 * MIT LICENCE
 *
 */

var path = require('path'),
    winston = require('../../../lib/winston');
const testLogFixturesPath = path.join(__dirname, '..', '..', 'fixtures', 'logs');

winston.exitOnError = function (err) {
  process.stdout.write(err.message);
  return err.message !== 'Ignore this error';
};

winston.handleExceptions([
  new winston.transports.File({
    filename: path.join(testLogFixturesPath, 'exit-on-error.log'),
    handleExceptions: true
  })
]);

setTimeout(function () {
  throw new Error('Ignore this error');
}, 100);
