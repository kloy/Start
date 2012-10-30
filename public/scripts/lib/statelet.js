/**
 * Backbone version of statelet.
 * Heavily inspired by https://github.com/joshwnj/statelet
 * @version 0.0.1
 */
 define(function (require) {

  'use strict';

  var _ = require('underscore'),
      Backbone = require('backbone');

  function Statelet (value) {
    this._events = _.clone(Backbone.Events);
    this._value = value;
  }

  Statelet.prototype = {

    // Get the current state
    get: function get () {

      return this._value;
    },

    // Set the current state
    set: function set (value) {

      // no change: ignore
      if (value === this._value) {
        return false;
      }

      this._value = value;
      this._events.trigger('change', value);
    },

    /**
     * Watch for any change in value
     * @param {Function} callback
     * @return {this} callback
     */
    watch: function watch (callback) {

      // if there is a value, run the callback immediately
      var value = this._value;

      if (value !== undefined) {
        callback(value);
      }

      // register the callback
      this._events.on('change', callback);

      return this;
    },

    /**
     * Remove function that is watching for a change
     * @param {Function} callback initially added
     * @returns {State}
     */
    unwatch: function unwatch (callback) {

      this._events.off('change', callback);

      return this;
    },

    /**
     * Watch for a certain value.
     * Returns the watch-callback so you can unwatch at a later stage.
     * @param mixed
     * @param function
     * @return function
     */
    when: function when (value, callback) {

      var watcher = function (v) {
        if (v === value) {
          callback();
        }
      };

      this.watch(watcher);

      return watcher;
    }
  };

  // return the constructor
  return Statelet;
});