define(function (require) {

  'use strict';

  var $ = require('jquery'),
      _ = require('util'),
      log = require('log');

  function Manager (sandbox, mediator) {

    var todosPromise;

    this.template = _.template(this.template),
    this.sandbox = sandbox;
    this.mediator = mediator;
    this.registerWidgets();
    // should be last
    this.render();
    this.swapRegion('content', 'todos');
  }

  Manager.prototype = {
    // widgets this app should manage
    widgets: {
      'todos': require('../widgets/todos/todos')
    },
    // Regions in our layout
    regions: {
      'content': '#main-content'
    },
    template: require('text!./templates/layout.html'),
    registerWidgets: function registerWidgets () {

      _.each(this.widgets, function (Widget, id) {

        this.sandbox.register(id, Widget);
      }.bind(this));

      return this;
    },
    render: function render () {

      $('#main').html(this.template());
    },
    swapRegion: function swapRegion (regionId, widgetId) {

      var regionSelector,
          $region,
          msg,
          widgetPromise,
          fnDone;

      // Ensure region is defined
      try {
        regionSelector = this.regions[regionId];
      } catch (e) {

        log.error('Manager.swapRegion(): region ' + regionId + ' not defined.');
        return false;
      }

      $region = $(regionSelector);

      // Ensure our region actually exists.
      if ( ! $region.length) {
        msg = 'Manager.swapRegion(): dom for selector ' + regionSelector;
        msg += 'does not match a dom element.';
        log.error(msg);

        return false;
      }

      widgetPromise = this.sandbox.start(widgetId, $region);
      fnDone = function fnDone () {
        var msg = 'Manager.swapRegion().fnDone(): widget "' + widgetId;
        msg += '" started in region "' + regionId + '" sucessfully.';
        log.notice(msg);
      }.bind(this);
      widgetPromise.done(fnDone);
    }
  };

  return Manager;
});