define(function (require) {

  'use strict';

  var util = require('util'),
      log = require('log');

  function Widget (opts) {

    var defaults = {
          uidPrefix: 'widget_'
        },
        options = {};

    options = util.extend({}, defaults, opts);

    this.uid = util.uniqueId(options.uidPrefix);
  }

  // add backbone style extendability
  Widget.sub = util.sub;

  Widget.prototype = {
    /**
      Subscribe to a channel on our mediator. Keeps a record of all things
      subscribed to allowing for easy cleanup on stopping.

      Return this
     */
    subscribe: function subscribe (channel, callback) {

      var msg,
          subscriber = {
            channel: channel,
            callback: callback
          };

      msg = 'Widget.subscribe(): channel ' + channel + ', uid ' + this.uid;
      log.notice(msg, callback);

      // Delay defining this._subscribers untill it is needed.
      if (util.isUndefined(this._subscribers)) {
        this._subscribers = [];
      }

      this._subscribers.push(subscriber);
      this._mediator.subscribe(channel, callback);

      return this;
    },
    /**
      Unsubscribe from a channel on our mediator. Remove recorded subscriber.

      Return this
     */
    unsubscribe: function unsubscribe (channel, callback) {

      var msg = 'Widget.unsubscribe(): channel ' + channel + ', uid ' + this.uid;
      log.notice(msg, callback);

      this._mediator.unsubscribe(channel, callback);

      this._subscribers = util.reject(function (subscriber) {

        return subscriber.channel === channel && subscriber.callback === callback;
      });

      return this;
    },
    /**
      Unsubscribe all from our mediator. Remove all recorded subscribers.

      Return this
     */
    unsubscribeAll: function unsubscribeAll () {

      var msg = 'Widget.unsubscribeAll(): uid ' + this.uid;
      log.notice(msg);

      this._subscribers.forEach(function (subscriber) {

        this._mediator.unsubscribe(subscriber.channel, subscriber.callback);
      }.bind(this));

      this._subscribers = [];
    },
    /**
      Publish to channel on our mediator.

      Return this
     */
    publish: function publish (channel, callback) {

      var msg = 'Widget.publish(): channel ' + channel + ', uid ' + this.uid;
      log.notice(msg, arguments);

      this._mediator.publish.apply(this._mediator, arguments);

      return this;
    },
    /*
      start a widget
      arguments are proxied to this.onStart with the defferred passed as the
      1st argument.

      returns promise
    */
    start: function start () {

      var deferred = new util.Deferred(),
          args = [].slice.call(arguments),
          asyncStart;

      asyncStart = function asyncStart () {

        if (this.onStart) {
          // mediator should be our 1st argument
          this._mediator = args.shift();
          args.push(deferred);
          this.onStart.apply(this, args);
        } else {
          deferred.resolve();
        }
      }.bind(this);

      // Exceute start code async
      util.defer(asyncStart);

      return deferred.promise();
    },
    /*
      stop a widget
      arguments are proxied to this.onStop with the defferred passed as the
      1st argument.

      returns promise
    */
    stop: function stop () {

      var deferred = new util.Deferred(),
          args = [].slice.call(arguments),
          asyncStop;

      asyncStop = function asyncStop () {

        this.unsubscribeAll();

        if (this.onStop) {
          args.push(deferred);
          this.onStop.apply(this, args);
        } else {
          deferred.resolve();
        }
      }.bind(this);

      // Exceute stop code async
      util.defer(asyncStop);

      return deferred.promise();
    }
  };

  return Widget;
});