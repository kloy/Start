define(function (require) {

  'use strict';

  return function () {

    var log = require('log'),
        manager = require('./manager'),
        sandbox = require('sandbox')();

    // Set the log levels to ignore.
    // TODO: Make this happen in a config.
    log.ignore([]);

    sandbox.register('App/Manager', manager);
    sandbox.start('App/Manager');
  };
});