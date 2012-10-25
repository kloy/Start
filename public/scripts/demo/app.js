define(function (require) {

  'use strict';

  return function () {

    var log = require('log'),
        manager = require('../widgets/manager/manager'),
        sandbox = require('sandbox')();

    // Set the log levels to ignore.
    // TODO: Make this happen in a config.
    log.ignore([]);

    // Register our app manager. This should be the first "widget" registered
    // and started for the app.
    sandbox.register('/App/Manager', manager);
    sandbox.start('/App/Manager');
  };
});