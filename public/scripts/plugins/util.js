define(function (require) {

  'use strict';

  var BB = require('backbone'),
      _ = require('underscore'),
      jQuery = require('jquery');

  return {
    // subclassing of an object
    extend: BB.Model.extend,

    forEach: _.forEach,

    isUndefined: _.isUndefined,

    clone: _.clone,

    template: _.template,

    Deferred: jQuery.Deferred,

    when: jQuery.when,

    defer: _.defer
  };
});