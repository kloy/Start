define(function (require) {

	var util = require('util');
	
	module('Util tests');

	test("util exists", 1, function () {
		
		expect(ok(util), 'util should exist.');
	});
});