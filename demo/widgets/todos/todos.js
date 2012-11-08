define(function (require) {

  'use strict';

  var Widget = require('widget'),
      log = require('log'),
      MasterView = require('./views/master');

  // Require some functionality that overrides how jQuery works a bit.
  require('jquerypp/animate');
  require('jquerypp/event/key');

	return Widget.extend({

    defaults: {
      uidPrefix: 'todos_'
    },

    onStart: function () {

      log.notice('Todos.onStart(): started', arguments);

      this.masterView = new MasterView();
      this.$el = this.masterView.$el;
    }
	});
});