define(function (require) {

  'use strict';

  var _ = require('util'),
      log = require('log');

  function Widget (opts) {

    var options = this.options = _.extend({}, this.defaults, opts);

    this.uid = _.uniqueId(options.uidPrefix);

    // call initialize method if it exists.
    if (this.initialize) {

      this.initialize.apply(this, arguments);
    }
  }

  Widget.extend = _.inherit;
  Widget.fn = Widget.prototype;

  _.extend(Widget.fn, {

    defaults: {
      uidPrefix: 'widget_'
    },
    /**
      Subscribe to a channel on our mediator. Keeps a record of all things
      subscribed to allowing for easy cleanup on stopping.

      Return this
     */
    subscribe: function (channel, callback) {

      var msg,
          subscriber = {
            channel: channel,
            callback: callback
          };

      msg = 'Widget.subscribe(): channel ' + channel + ', uid ' + this.uid;
      log.notice(msg, callback);

      // Delay defining this._subscribers until it is needed.
      if (_.isUndefined(this._subscribers)) {
        this._subscribers = [];
      }

      this._subscribers.push(subscriber);
      this._hub.subscribe(channel, callback);

      return this;
    },
    /**
      Unsubscribe from a channel on our mediator. Remove recorded subscriber.

      Return this
     */
    unsubscribe: function (channel, callback) {

      var msg = 'Widget.unsubscribe(): channel ' + channel + ', uid ' + this.uid;
      log.notice(msg, callback);

      this._hub.unsubscribe(channel, callback);

      this._subscribers = _.reject(function (subscriber) {

        return subscriber.channel === channel && subscriber.callback === callback;
      });

      return this;
    },
    /**
      Unsubscribe all from our mediator. Remove all recorded subscribers.

      Return this
     */
    unsubscribeAll: function () {

      var msg = 'Widget.unsubscribeAll(): uid ' + this.uid;
      log.notice(msg);

      this._subscribers.forEach(function (subscriber) {

        this._hub.unsubscribe(subscriber.channel, subscriber.callback);
      }.bind(this));

      this._subscribers = [];
    },
    /**
      Publish to channel on our mediator.

      Return this
     */
    publish: function (channel, callback) {

      var msg = 'Widget.publish(): channel ' + channel + ', uid ' + this.uid;
      log.notice(msg, arguments);

      this._hub.publish.apply(this._hub, arguments);

      return this;
    },
    /*
      start a widget
      mediator is required 1st param.
      async is optional 2nd param. If async is true returns a promise.
      arguments are proxied to this.onStart with the defferred passed as the
      1st argument. [*args] is the 2nd... arguments

      returns this or promise
    */
    start: function (hub, async) {

      var deferred,
          args = [].slice.call(arguments),
          fnStart;

      fnStart = function () {

        if (this.onStart) {
          // mediator should be our 1st argument
          this._hub = args.shift();

          if (async) {
            args.unshift(deferred);
          }

          this.onStart.apply(this, args);
        } else {

          deferred.resolve();
        }
      }.bind(this);

      if (async) {

        deferred = new _.Deferred();

        // Exceute start code async
        _.async(fnStart);

        return deferred.promise();
      } else {

        fnStart();

        return this;
      }
    },
    /*
      stop a widget
      arguments are proxied to this.onStop with the defferred passed as the
      1st argument.

      returns promise
    */
    stop: function () {

      var deferred = new _.Deferred(),
          args = [].slice.call(arguments),
          asyncStop;

      asyncStop = function () {

        this.unsubscribeAll();

        if (this.onStop) {
          args.push(deferred);
          this.onStop.apply(this, args);
        } else {
          deferred.resolve();
        }
      }.bind(this);

      // Exceute stop code async
      _.async(asyncStop);

      return deferred.promise();
    }
  });

  return Widget;
});