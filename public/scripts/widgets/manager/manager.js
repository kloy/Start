define(function (require) {

  'use strict';

	return function (sandbox) {

    var log = require('log'),
        State = require('statelet'),
        Layout = require('./views/layout'),
        $ = require('jquery');

    var layout = new Layout();
    $('#main').empty().append(layout.$el);

		return {

      stop: function () {

        layout.$el.remove();
      }
		};
	};
});