define(function (require) {

  'use strict';

  var log = require('log'),
      Manager = require('../widgets/manager/manager'),
      Sandbox = require('sandbox');

  function App () {

    var managerId = this.managerId = '/App/Manager';
    var sandbox = this.sandbox = new Sandbox();

    // Set the log levels to ignore.
    // TODO: Make this happen in a config.
    log.ignore('NoTice');

    // Register our app manager. This should be the first "widget" registered
    // and started for the app.
    sandbox.register(managerId, Manager);
    sandbox.start(managerId).done(this.managerStarted.bind(this));
  }

  App.prototype = {
    managerStarted: function () {
      log.info("Manager started by app.");
      this.sandbox._mediator.publish('/foo');
    }
  };

  return App;
});