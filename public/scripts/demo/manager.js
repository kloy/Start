define(function (require) {

  'use strict';

	return function (sandbox) {

    var log = require('log'),
        State = require('statelet'),
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