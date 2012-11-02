define(function (require) {

  'use strict';

  var Widget = require('widget'),
      log = require('log'),
      MasterView = require('./views/master');

	return Widget.sub({

    onStart: function (dfd, $parent) {

      log.notice('Todos.onStart(): started', arguments);
      this.$parent = $parent;
      this.masterView = new MasterView();
      $parent.append(this.masterView.$el);
      dfd.resolve();
    },

    onStop: function (dfd) {

      this.masterView.destroy();
      dfd.resolve();
    }
	});
});