// A sandbox is used when you need to start and stop widgets dynmically and
// have them share a mediator.
define(function (require) {

  'use strict';

  var _ = require('util'),
      log = require('log');

  function Sandbox (mediator) {
    this._widgets = {};
    this._runningWidgets = {};
    this._mediator = mediator;
  }

  Sandbox.prototype = {

    // register a widget to the sandbox
    // id should be unique
    // widget should be an anonymous function or a function reference
    register: function register (id, Widget) {

      if (! this.isRegistered(id)) {

        log.notice("Sandbox.register(): Widget: " + id + " registered.");
        this._widgets[id] = Widget;
      } else {

        throw "Sandbox.register(): Widget with id: " + id + " already exists.";
      }
    },
    // Check if a widget is registered
    isRegistered: function isRegistered (id) {

      return ! _.isUndefined(this._widgets[id]);
    },
    // Deregister a widget.
    // TODO: stop a widget before it is unregistered.
    deregister: function deregister (id) {

      var msg = '';

      if (this.isRegistered(id)) {

        if (this.isRunning(id)) {
          msg = "Sandbox.deregister(): Widget with id: " + id + " is running.";
          msg += " You must stop the widget before deregister it.";
          throw msg;
        }

        delete this._widgets[id];
        log.notice("Sandbox.deregister(): Widget: " + id + " deregister.");
      } else {

        throw "Sandbox.deregister(): Widget with id: " + id + " does not exists.";
      }
    },
    // start a widget using it's registered id.
    // Require first param is id. optional [*args].
    // [*args] will be proxied to widget.start(mediator, [*args])
    start: function start (id) {

      var promise,
          fnDone,
          fnFail,
          widget,
          args;

      log.notice("Sandbox.start(): Widget: " + id + " starting...");

      if (! this.isRunning(id)) {

        widget = new this._widgets[id]();
        args = [].slice.call(arguments);
        // shift off id
        args.shift();
        // Make the mediator the 1st arg.
        args.unshift(this._mediator);

        fnDone = function () {
          this._runningWidgets[id] = widget;
          log.notice("Sandbox.start(): Widget: " + id + " started.");
        }.bind(this);

        fnFail = function () {
          log.error("Sandbox.start(): Widget: " + id + " failed to start.");
        }.bind(this);

        // Start widget passing a mediator as 1st arg.
        promise = widget.start.apply(widget, args);

        return promise.fail(fnFail).done(fnDone);
      } else {

        throw "Sandbox.start(): Widget with id: " + id + " already running.";
      }
    },
    // stop a widget using it's registered id.
    stop: function stop (id) {

      var promise,
          fnDone,
          fnFail;

      log.notice("Sandbox.stop(): Widget: " + id + " stopping...");

      if (this.isRunning(id)) {

        // promise's "done" callback
        fnDone = function () {
          delete this._runningWidgets[id];
          log.notice("Sandbox.stop(): Widget: " + id + " stopped.");
        }.bind(this);

        // promise's "fail" callback
        fnFail = function () {
          log.error("Sandbox.stop(): Widget: " + id + " failed to stop.");
        }.bind(this);

        promise = this._runningWidgets[id].stop();

        return promise.fail(fnFail).done(fnDone);
      } else {

        throw "Sandbox.stop(): Widget with id: " + id + " is not running.";
      }
    },
    // Check if a widget is listed as running.
    isRunning: function isRunning (id) {

      return ! _.isUndefined(this._runningWidgets[id]);
    },
    // get the instance of a running widget
    getRunning: function getRunning (id) {

      if (this.isRunning(id)) {

        return this._runningWidgets[id];
      } else {

        throw "Sandbox.getRunning(): Widget with id: " + id + " is not running.";
      }
    }
  };

  return Sandbox;
});