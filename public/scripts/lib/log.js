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
  var _ignored = {};

  return {
    /**
      Log to notice group
      @param [arguments] *args to log
     */
    notice: function () {

      if ( ! _ignored.notice) {
        console.log.apply(console, arguments);
      }
    },
    /**
      Log to info group
      @param [arguments] *args to log
     */
    info: function () {

      if ( ! _ignored.info) {
        console.info.apply(console, arguments);
      }
    },
    /**
      Log to debug group
      @param [arguments] *args to log
     */
    debug: function () {

      if ( ! _ignored.debug) {
        console.debug.apply(console, arguments);
      }
    },
    /**
      Log to warn group
      @param [arguments] *args to log
     */
    warn: function () {

      if ( ! _ignored.warn) {
        console.warn.apply(console, arguments);
      }
    },
    /**
      Log to error group
      @param [arguments] *args to log
     */
    error: function () {

      if ( ! _ignored.error) {
        console.error.apply(console, arguments);
      }
    },
    /**
      Set levels to ignore.
      @param [arguments] args* of log types as strings.
     */
    ignore: function () {

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