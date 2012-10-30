// A sandbox is used when you need to start and stop widgets dynmically and
// have them share a mediator.
define(function (require) {

  'use strict';

  var _ = require('util'),
      log = require('log'),
      Mediator = require('mediator');

  function Sandbox () {
    this._widgets = {};
    this._runningWidgets = {};
    this._mediator = new Mediator();
  }

  Sandbox.prototype = {
    // register a widget to the sandbox
    // id should be unique
    // widget should be an anonymous function or a function reference
    register: function (id, Widget) {

      if (_.isUndefined(this._widgets[id])) {

        log.notice("Sandbox.register(): Widget: " + id + " registered.");
        this._widgets[id] = Widget;
      } else {

        throw "Sandbox.register(): Widget with id: " + id + " already exists.";
      }
    },
    // Unregister a widget.
    // TODO: stop a widget before it is unregistered.
    unregister: function (id) {

      if (_.isUndefined(this._widgets[id])) {

        throw "Sandbox.unregister(): Widget with id: " + id + " does not exists.";
      } else {

        delete this._widgets[id];
        log.notice("Sandbox.unregister(): Widget: " + id + " unregistered.");
      }
    },
    // start a widget using it's registered id.
    start: function (id) {

      var promise,
          fnDone,
          fnFail,
          widget;

      if (_.isUndefined(this._runningWidgets[id])) {

        widget = new this._widgets[id]();

        fnDone = function () {
          this._runningWidgets[id] = widget;
          log.notice("Sandbox.start(): Widget: " + id + " started.");
        }.bind(this);

        fnFail = function () {
          log.error("Sandbox.start(): Widget: " + id + " failed to start.");
        }.bind(this);

        promise = widget.start(this._mediator);

        return promise.fail(fnFail).done(fnDone);
      } else {

        throw "Sandbox.start(): Widget with id: " + id + " already running.";
      }
    },
    // stop a widget using it's registered id.
    stop: function (id) {

      var promise,
          fnDone,
          fnFail;

      if (! _.isUndefined(this._runningWidgets[id])) {

        fnDone = function () {
          delete this._runningWidgets[id];
          log.notice("Sandbox.stop(): Widget: " + id + " stopped.");
        }.bind(this);

        fnFail = function () {
          log.notice("Sandbox.stop(): Widget: " + id + " failed to stop.");
        }.bind(this);

        promise = this._runningWidgets[id].stop();

        return promise.fail(fnFail).done(fnDone);
      } else {

        throw "Sandbox.stop(): Widget with id: " + id + " is not running.";
      }
    },
    // get the instance of a running widget
    getRunning: function (id) {

      if (_.isUndefined(this._runningWidgets[id])) {

        throw "Sandbox.getRunning(): Widget with id: " + id + " is not running.";
      } else {

        return this._runningWidgets[id];
      }
    }
  };

  return Sandbox;
});