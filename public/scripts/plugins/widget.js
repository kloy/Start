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
          args,
          mediator;

      if (this.onStart) {
        args = [].slice.call(arguments);
        // mediator should be our 1st argument
        mediator = args.shift();
        args.push(deferred);
        this.onStart.apply(this, args);
      }

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
          args;

      if (this.onStop) {
        args = [].slice.call(arguments);
        args.push(deferred);
        this.onStop.apply(this, args);
      }

      return deferred.promise();
    }
  };

  return Widget;
});