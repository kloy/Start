define(function (require) {

  'use strict';

	return function (sandbox) {

    var log = require('log'),
        StateMachine = require('stateMachine'),
        sm = new StateMachine();

    log.info('manager started');

		return {

      stop: function () {

        log.info('manager started');
      }
		};
	};
});