define(function (require) {

  'use strict';

	return function (sandbox) {

    var log = require('log'),
        StateMachine = require('stateMachine'),
        sm = new StateMachine();

		return {

      stop: function () {

        log.info('manager started');
      }
		};
	};
});