define(function (require) {

  'use strict';

	return function (sandbox) {

    var log = require('log'),
        StateMachine = require('stateMachine'),
        sm = new StateMachine(),
        AppLayout = require('./views/app'),
        $ = require('jquery');

    var $app = new AppLayout().$el;
    $('#main').empty().append($app);

		return {

      stop: function () {

        $app.remove();
      }
		};
	};
});