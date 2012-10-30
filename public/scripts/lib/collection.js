define(function (require) {

  'use strict';

  var BB = require('backbone'),
      _ = require('util');

  return _.clone(BB.Collection);
});