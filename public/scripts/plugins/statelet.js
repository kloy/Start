/**
 * Backbone version of statelet.
 * Heavily inspired by https://github.com/joshwnj/statelet
 * @version 0.0.1
 */
 define(function (require) {

  'use strict';

  var _ = require('underscore'),
      Backbone = require('backbone');

  function State (value) {
    this._events = _.clone(Backbone.Events);
    this._value = value;
  }

  State.prototype = {

    // Get the current state
    get: function () {

      return this._value;
    },

    // Set the current state
    set: function (value) {

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
     * @return {State} callback
     */
    watch: function (callback) {

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
    unwatch: function (callback) {

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
    when: function (value, callback) {

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
  return State;
});