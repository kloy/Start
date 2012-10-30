/**
  Implementation of mediator pattern.
  @module mediator
 */
define(function (require) {

  'use strict';

  /**
    @constructor Mediator
   */
  function Mediator () {
    var BB = require('backbone'),
        _ = require('util');

    this._events = _.clone(BB.Events);
  }

  Mediator.prototype = {
    subscribe: function () {

      this._events.on.apply(this._events, arguments);
    },
    unsubscribe: function () {

      this._events.off.apply(this._events, arguments);
    },
    publish: function () {

      this._events.trigger.apply(this._events, arguments);
    }
  };

  return Mediator;
});