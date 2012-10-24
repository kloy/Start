define(function () {

  'use strict';

  var _ignored = {
    notice: false,
    info: false,
    debug: false,
    warn: false,
    error: false
  };

  return {
    // notice logs
    notice: function () {

      if ( ! _ignored["notice"]) {
        console.log.apply(console, arguments);
      }
    },
    // info logs
    info: function () {

      if ( ! _ignored["info"]) {
        console.info.apply(console, arguments);
      }
    },
    // debug logs
    debug: function () {

      if ( ! _ignored["debug"]) {
        console.debug.apply(console, arguments);
      }
    },
    // warn logs
    warn: function () {

      if ( ! _ignored["warn"]) {
        console.warn.apply(console, arguments);
      }
    },
    // error logs
    error: function () {

      if ( ! _ignored["error"]) {
        console.error.apply(console, arguments);
      }
    },
    // set the levels to ignore
    ignore: function (levels) {

      levels.forEach(function (val) {

        _ignored[val] = true;
      });
    }
  };
});