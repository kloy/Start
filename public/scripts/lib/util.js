define(function (require) {

  'use strict';

  var BB = require('backbone'),
      _ = require('underscore'),
      jQuery = require('jquery');

  return {
    // subclassing of an object
    sub: BB.Model.extend,

    /**
      @link http://underscorejs.org/#extend
      @alias _.extend
    */
    extend: _.extend,

    /**
      @link http://underscorejs.org/#isUndefined
      @alias _.isUndefined
    */
    isUndefined: _.isUndefined,

    /**
      @link http://underscorejs.org/#clone
      @alias _.clone
    */
    clone: _.clone,

    /**
      @link http://underscorejs.org/#template
      @alias _.template
    */
    template: _.template,

    /**
      @link http://api.jquery.com/category/deferred-object/
      @alias jQuery.Deffered
    */
    Deferred: jQuery.Deferred,

    /**
      @link http://underscorejs.org/#defer
      @alias _.defer
    */
    defer: _.defer,

    /**
      @link http://underscorejs.org/#reject
      @alias _.reject
    */
    reject: _.reject,

    /**
      @link http://underscorejs.org/#uniqueId
      @alias _.uniqueId
    */
    uniqueId: _.uniqueId
  };
});