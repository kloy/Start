/*global asyncTest:true, deepEqual:true, equal:true, expect:true, module:true, 
	notDeepEqual:true, notEqual:true, notStrictEqual:true, ok:true, QUnit:true, 
	raises:true, start:true, stop:true, strictEqual:true, test:true */
define(function (require) {

	'use strict';

	var util = require('util');
	
	module('Util tests');

	test("util exists", 1, function () {
		
		expect(ok(util), 'util should exist.');
	});
});