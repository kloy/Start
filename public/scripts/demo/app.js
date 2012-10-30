define(function (require) {

  'use strict';

  return function () {

    var log = require('log'),
        managerId = '/App/Manager',
        Manager = require('../widgets/manager/manager'),
        managerStarting,
        Sandbox = require('sandbox'),
        sandbox = new Sandbox();

    // Set the log levels to ignore.
    // TODO: Make this happen in a config.
    log.ignore([]);

    // Register our app manager. This should be the first "widget" registered
    // and started for the app.
    sandbox.register(managerId, Manager);
    sandbox.start(managerId).done(function () {
      // sandbox.stop(managerId).done(function () {
      //   sandbox.unregister(managerId);
      // });
    });
  };
});