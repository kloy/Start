// A sandbox is used when you need to start and stop widgets dynmically and
// have them share a mediator.
define(function (require) {

  'use strict';

  var _ = require('util'),
      log = require('log'),
      Mediator = require('mediator'),
      Sandbox = require('sandbox');

  function Core () {

    // Container for registered widgets.
    this._widgets = {};
    // Container for running (instantiated) widgets.
    this._runningWidgets = {};
    // Instance of our mediator.
    this._mediator = new Mediator();
  }

  Core.prototype = {

    // register a widget to the core
    // id should be unique
    // widget should be a constructor function
    register: function (id, Widget) {

      if (! this.isRegistered(id)) {

        log.notice("Core.register(): Widget: " + id + " registered.");
        this._widgets[id] = Widget;
      } else {

        throw "Core.register(): Widget with id: " + id + " already exists.";
      }
    },
    // Check if a widget is registered
    isRegistered: function (id) {

      return ! _.isUndefined(this._widgets[id]);
    },
    // Deregister a widget.
    // TODO: stop a widget before it is unregistered.
    deregister: function (id) {

      var msg = '';

      if (this.isRegistered(id)) {

        if (this.isRunning(id)) {
          msg = "Core.deregister(): Widget with id: " + id + " is running.";
          msg += " You must stop the widget before deregister it.";
          throw msg;
        }

        delete this._widgets[id];
        log.notice("Core.deregister(): Widget: " + id + " deregister.");
      } else {

        throw "Core.deregister(): Widget with id: " + id + " does not exists.";
      }
    },
    // Return a list of registered widget ids.
    lsRegistered: function () {

      var list = [];

      _.each(this._widgets, function (Widget, id) {

        list.push(id);
      });

      return list;
    },
    // Return a list of running widget ids.
    lsRunning: function () {

      var list = [];

      _.each(this._runningWidgets, function (Widget, id) {

        list.push(id);
      });

      return list;
    },
    // start a widget using it's registered id.
    // Require first param is id. optional [*args].
    // [*args] will be proxied to widget.start(mediator, [*args])
    start: function (id) {

      var promise,
          fnDone,
          fnFail,
          widget,
          args;

      log.notice("Core.start(): Widget: " + id + " starting...");

      if (! this.isRunning(id)) {

        widget = new this._widgets[id]();
        args = [].slice.call(arguments);
        // shift off id
        args.shift();
        // Make the mediator the 1st arg.
        args.unshift(this._mediator);

        fnDone = function () {
          this._runningWidgets[id] = widget;
          log.notice("Core.start(): Widget: " + id + " started.");
        }.bind(this);

        fnFail = function () {
          log.error("Core.start(): Widget: " + id + " failed to start.");
        }.bind(this);

        // Start widget passing a mediator as 1st arg.
        promise = widget.start.apply(widget, args);

        return promise.fail(fnFail).done(fnDone);
      } else {

        throw "Core.start(): Widget with id: " + id + " already running.";
      }
    },
    // stop a widget using it's registered id.
    stop: function (id) {

      var promise,
          fnDone,
          fnFail;

      log.notice("Core.stop(): Widget: " + id + " stopping...");

      if (this.isRunning(id)) {

        // promise's "done" callback
        fnDone = function () {
          delete this._runningWidgets[id];
          log.notice("Core.stop(): Widget: " + id + " stopped.");
        }.bind(this);

        // promise's "fail" callback
        fnFail = function () {
          log.error("Core.stop(): Widget: " + id + " failed to stop.");
        }.bind(this);

        promise = this._runningWidgets[id].stop();

        return promise.fail(fnFail).done(fnDone);
      } else {

        throw "Core.stop(): Widget with id: " + id + " is not running.";
      }
    },
    // Check if a widget is running.
    isRunning: function (id) {

      return ! _.isUndefined(this._widgetInstances[id]);
    },
    // get the a running widget
    getRunning: function (id) {

      if (this.isRunning(id)) {

        return this._runningWidgets[id];
      } else {

        throw "Core.getRunning(): Widget with id: " + id + " is not running.";
      }
    }
  };

  return Core;
});