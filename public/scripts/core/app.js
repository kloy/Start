define(function (require) {

  'use strict';

  return function () {

    var log = require('log'),
        manager = require('./manager'),
        sandbox = require('sandbox')();

    sandbox.register('App/Manager', manager);
    sandbox.start('App/Manager');
  };
});