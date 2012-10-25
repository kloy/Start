// A sandbox is used when you need to start and stop widgets dynmically and
// have them share a mediator.
define(function (require) {

  'use strict';

  return function () {
    var _widgets = {},
      _runningWidgets = {},
      mediator = require('mediator')(),
      _ = require('underscore'),
      log = require('log');

    return {

      // register a widget to the sandbox
      // id should be unique
      // widget should be an anonymous function or a function reference
      register: function (id, widget) {

        if (_.isUndefined(_widgets[id])) {

          log.notice("sandbox.register(): Widget: " + id + " registered.");
          _widgets[id] = widget;
        } else {

          throw "sandbox.register(): Widget with id: " + id + " already exists.";
        }
      },

      unregister: function (id) {

        if (_.isUndefined(_widgets[id])) {

          throw "sandbox.unregister(): Widget with id: " + id + " does not exists.";
        } else {

          delete _widgets[id];
          log.notice("sandbox.unregister(): Widget: " + id + " unregistered.");
        }
      },

      // start a widget using it's registered id.
      start: function (id) {

        if (_.isUndefined(_runningWidgets[id])) {

          _runningWidgets[id] = _widgets[id](mediator);

          log.notice("sandbox.start(): Widget: " + id + " started.");

          return _runningWidgets[id];
        } else {

          throw "sandbox.start(): Widget with id: " + id + " already running.";
        }
      },

      // stop a widget using it's registered id.
      stop: function (id) {

        if (_.isUndefined(_runningWidgets[id])) {

          throw "sandbox.stop(): Widget with id: " + id + " is not running.";
        } else {

          _runningWidgets[id].stop();
          delete _runningWidgets[id];
          log.notice("sandbox.stop(): Widget: " + id + " stopped.");
        }
      },

      // get the instance of a running widget
      getRunning: function (id) {

        if (_.isUndefined(_runningWidgets[id])) {

          throw "sandbox.getRunning(): Widget with id: " + id + " is not running.";
        } else {

          return _runningWidgets[id];
        }
      }
    };
  };
});