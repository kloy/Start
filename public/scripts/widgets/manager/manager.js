define(function (require) {

  'use strict';

  var Widget = require('widget'),
      log = require('log'),
      $ = require('jquery'),
      Layout = require('./views/layout');

  return Widget.extend({
    onStart: function (deferred) {

      var layout = this._layout = new Layout();
      $('#main').empty().append(layout.$el);
      log.info("Manager.onStart(): started.");
      deferred.resolve();
    },
    onStop: function (deferred) {

      this._layout.$el.remove();
      log.info("Manager.onStop(): stopped.");
      deferred.resolve();
    }
  });
});