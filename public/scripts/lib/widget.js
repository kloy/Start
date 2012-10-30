define(function (require) {

  'use strict';

  var util = require('util');

  function Widget () {

  }

  // add backbone style extendability
  Widget.extend = util.extend;

  Widget.prototype = {
    /*
      start a widget
      arguments are proxied to this.onStart with the defferred passed as the
      1st argument.

      returns promise
    */
    start: function () {

      var deferred = new util.Deferred(),
          args = [].slice.call(arguments),
          asyncStart;

      asyncStart = function () {

        var mediator;

        if (this.onStart) {
          // mediator should be our 1st argument
          mediator = args.shift();
          args.push(deferred);
          this.onStart.apply(this, args);
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
    stop: function () {

      var deferred = new util.Deferred(),
          args = [].slice.call(arguments),
          asyncStop;

      asyncStop = function () {
        if (this.onStop) {
          args.push(deferred);
          this.onStop.apply(this, args);
        }
      }.bind(this);

      // Exceute stop code async
      util.defer(asyncStop);

      return deferred.promise();
    }
  };

  return Widget;
});