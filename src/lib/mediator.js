/**
  Implementation of mediator pattern.
  @module mediator
 */
define(function (require) {

  'use strict';

  var BB = require('backbone'),
      _ = require('util'),
      log = require('log');

  /**
    @constructor Mediator
   */
  function Mediator (opts) {

    var defaults = {
          uidPrefix: 'mediator_'
        },
        options = {};

    options = _.extend({}, defaults, opts);

    this.uid = _.uniqueId(options.uidPrefix);

    this._events = _.clone(BB.Events);
  }

  Mediator.prototype = {
    /**
      Subscribe to a channel.
    */
    subscribe: function (channel, callback) {

      var msg;

      msg = 'Mediator.subscribe(): channel ' + channel + ', uid ' + this.uid;
      log.notice(msg, callback);
      this._events.on.call(this._events, channel, callback);
    },
    /**
      Unsubscribe from a channel
    */
    unsubscribe: function (channel, callback) {

      var msg;

      msg = 'Mediator.unsubscribe(): channel ' + channel + ', uid ' + this.uid;
      log.notice(msg, callback);

      this._events.off.call(this._events, channel, callback);
    },
    /**
      Publish a channel

      Args: channels, [*args]
    */
    publish: function (channel, optionalArgs) {

      var msg;

      msg = 'Mediator.publish(): channel ' + channel + ', uid ' + this.uid;
      log.notice(msg, arguments);

      this._events.trigger.apply(this._events, arguments);
    }
  };

  return Mediator;
});