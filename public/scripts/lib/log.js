define(function () {

  'use strict';

  return {
    // info logs
    info: function () {

      console.log.apply(console, arguments);
    },
    // debug logs
    debug: function () {

      console.log.apply(console, arguments);
    },
    // error logs
    error: function () {

      console.error.apply(console, arguments);
    }
  };
});