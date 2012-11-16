/*global asyncTest:true, deepEqual:true, equal:true, expect:true, module:true, 
  notDeepEqual:true, notEqual:true, notStrictEqual:true, ok:true, QUnit:true, 
  raises:true, start:true, stop:true, strictEqual:true, test:true */
define(function (require) {

  'use strict';

  var jq = require('jquery');

  module("Vendor Tests");

  test('jQuery exists', 1, function () {

    expect(ok(jq), "jQuery should exist.");
  });

  test('Underscore exists', 2, function () {

    var underscore = require('underscore');

    expect(ok(underscore), "Underscore should exist.");
    expect(ok(underscore.template), "Underscore should have template function.");
  });

  test('Backbone exists', 5, function () {

    var BB = require('backbone');

    expect(ok(BB), "Backbone should exist.");
    expect(ok(BB.Model), "Backbone should have Model class.");
    expect(ok(BB.View), "Backbone should have View class.");
    expect(ok(BB.Collection), "Backbone should have Collection class.");
    expect(ok(BB.Events), "Backbone should have Events class.");
  });

});