define(function (require) {

  'use strict';

  var log = require('log'),
      Mediator = require('mediator'),
      Sandbox = require('sandbox'),
      Manager = require('./manager');

  return function App () {

    // Application core mediator.
    var mediator = new Mediator(),
        // Global sandbox for widgets
        sandbox = new Sandbox(mediator),
        manager;

    // Set the log levels to ignore.
    // TODO: Make this happen in a config.
    log.ignore();

    // Global application manager.
    manager = new Manager(sandbox, mediator);
  };
});