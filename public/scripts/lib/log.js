/**
  Provides logging functionality that would be expected in a more
  traidtional Server Side technology. Provides logging groups and a method
  of ignoring certain groups.
  @module log
 */
define(function (require) {

  'use strict';

  /**
    Hash of ignored groups.
   */
  var _ignored = {},
      slice = Array.prototype.slice,
      log,
      moment = require('moment');

  // [Tue Oct 30 08:18:29 2012] [notice] asdf
  log = function log (level, args) {

    var prefix;

    if ( ! _ignored[level]) {
      prefix = '[' + moment().format('ddd MMM DD hh:mm:ss YYYY') + ']\t';
      prefix += '[' + level + ']\t';
      args.unshift(prefix);
      console.log.apply(console, args);
    }
  };

  return {
    /**
      Log to notice group
      @param [arguments] *args to log
     */
    notice: function notice () {

      log.call(null, 'notice', slice.call(arguments));
    },
    /**
      Log to info group
      @param [arguments] *args to log
     */
    info: function info () {

      log.call(null, 'info', slice.call(arguments));
    },
    /**
      Log to debug group
      @param [arguments] *args to log
     */
    debug: function debug () {

      log.call(null, 'debug', slice.call(arguments));
    },
    /**
      Log to warn group
      @param [arguments] *args to log
     */
    warn: function warn () {

      log.call(null, 'warn', slice.call(arguments));
    },
    /**
      Log to error group
      @param [arguments] *args to log
     */
    error: function error () {

      log.call(null, 'error', slice.call(arguments));
    },
    /**
      Set levels to ignore.
      @param [arguments] args* of log types as strings.
     */
    ignore: function ignore () {

      // Converts arguments to array
      var levels = [].slice.call(arguments),
          length = levels.length - 1;

      while (length) {
        _ignored[levels[length]] = true;
        --length;
      }
    }
  };
});