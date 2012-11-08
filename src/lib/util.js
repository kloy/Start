define(function (require) {

  'use strict';

  var _ = require('underscore'),
      jQuery = require('jquery'),
      util = {},
      BB = require('backbone');

  // Expose Backbone's extend functionality
  util.inherit = BB.Model.extend;

  /**
    @link http://underscorejs.org/#extend
    @alias _.extend
  */
  util.extend = _.extend;

  /**
    @link http://underscorejs.org/#isUndefined
    @alias _.isUndefined
  */
  util.isUndefined = _.isUndefined;

  // Reverse of isUndefined
  util.isDefined = function () {

    return ! _.isUndefined.apply(_, arguments);
  };

  /**
    @link http://underscorejs.org/#isFunction
    @alias _.isFunction
  */
  util.isFunction = _.isFunction;

  /**
    @link http://underscorejs.org/#clone
    @alias _.clone
  */
  util.clone = _.clone;

  /**
    @link http://api.jquery.com/category/deferred-object/
    @alias jQuery.Deffered
  */
  util.Deferred = jQuery.Deferred,

  /**
    Force a function to execute asyncronously.

    @link http://underscorejs.org/#defer
    @alias _.defer
  */
  util.async = _.defer;

  /**
    @link http://underscorejs.org/#reject
    @alias _.reject
  */
  util.reject = _.reject;

  /**
    @link http://underscorejs.org/#each
    @alias _.each
  */
  util.each = _.each;

  /**
    @link http://underscorejs.org/#uniqueId
    @alias _.uniqueId
  */
  util.uniqueId = _.uniqueId;

  /**
    @link http://underscorejs.org/#template
    @alias _.template
  */
  util.tmpl = _.template;

  return util;
});