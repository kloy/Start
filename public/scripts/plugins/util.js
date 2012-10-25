define(function (require) {

  'use strict';

  var $ = require('jquery'),
    _ = require('underscore');

  return {

    // Expose Underscore's extend
    extend: function () {

      return _.extend.apply(_, arguments);
    },

    // Expose Underscore's isUndefined
    isUndefined: function () {

      return _.isUndefined.apply(_, arguments);
    },

    // Expose Underscore's each
    each: function () {

      return _.each.apply(_, arguments);
    },

    // Expose Underscore's template
    tmpl: function () {

      return _.template.apply(_, arguments);
    },

    // Expose Underscore's escape
    escape: function () {

      return _.escape.apply(_, arguments);
    },

    // Expose Underscore's uniqueId
    uniqueId: function () {

      return _.uniqueId.apply(_, arguments);
    },

    // Alias jQuery's Deferred
    deferred: $.Deferred,

    // Alias jQuery's when
    when: $.when
  };
});