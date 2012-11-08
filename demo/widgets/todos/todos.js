define(function (require) {

  'use strict';

  var Widget = require('widget'),
      log = require('log'),
      MasterView = require('./views/master');

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