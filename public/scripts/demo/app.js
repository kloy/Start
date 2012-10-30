define(function (require) {

  'use strict';

  var log = require('log'),
      Manager = require('../widgets/manager/manager'),
      Sandbox = require('sandbox');

  function App () {

    var managerId = this.managerId = '/App/Manager';
    var sandbox = this.sandbox = new Sandbox();

    // Register our app manager. This should be the first "widget" registered
    // and started for the app.
    sandbox.register(managerId, Manager);
    sandbox.start(managerId).done(this.managerStarted.bind(this));

    // Set the log levels to ignore.
    // TODO: Make this happen in a config.
    log.ignore([]);
  }

  App.prototype = {
    managerStarted: function () {
      log.info("App Started");
    }
  };

  return App;
});