define(function (require) {

  'use strict';

  var Widget = require('widget'),
      log = require('log'),
      $ = require('jquery'),
      Layout = require('./views/layout');

  return Widget.sub({
    onStart: function (deferred) {

      var layout = this._layout = new Layout();
      $('#main').empty().append(layout.$el);
      log.info("Manager.onStart(): started.");

      this.subscribe('/foo', function () {
        console.info('foo subscriber', arguments);
      });

      deferred.resolve();
      this.publish('/foo', 'Keith is awesome.');
    },
    onStop: function (deferred) {

      this._layout.$el.remove();
      log.info("Manager.onStop(): stopped.");
      deferred.resolve();
    }
  });
});