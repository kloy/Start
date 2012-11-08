define(function (require) {

  'use strict';

  var $ = require('jquery'),
      _ = require('util'),
      log = require('log'),
      Statelet = require('statelet');

  function Manager (sandbox, mediator) {

    var todosPromise;

    this._contentState = new Statelet();
    this.template = _.template(this.template),
    this.sandbox = sandbox;
    this.mediator = mediator;
    this.registerWidgets();
    // should be last
    this.render();
    this.swapRegion('content', 'todos');
    // this.swapRegion('content', 'todos');
    // this.swapRegion('content', 'todos');
    this.clearRegion('content');
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
    // Clear a region by id.
    // TODO: Figure out how to handle async stopping of widget elegantly.
    clearRegion: function clearRegion (regionId) {

    },
    swapRegion: function swapRegion (regionId, widgetId) {

      var regionSelector,
          $region,
          msg,
          // Previous widget in region's start promise
          prevStartPromise,
          // Previous widget in region's stop promise
          prevStopPromise,
          onStartDone,
          onPrevStartDone,
          onPrevStopDone,
          state;

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

      // Get region's current state
      state = this._contentState.get();

      onPrevStopDone = function () {

        this['_' + regionId +'Promise'] = this.sandbox.start(widgetId, $region);
        this['_' + regionId +'Promise'].done(onStartDone);
      }.bind(this);

      onPrevStartDone = function () {

        this.sandbox.stop(state, $region).done(onPrevStopDone);
      }.bind(this);

      onStartDone = function () {

        var msg = 'Manager.swapRegion().fnDone(): widget "' + widgetId;
        msg += '" started in region "' + regionId + '" sucessfully.';
        log.notice(msg);
      };

      // Check if we have a current state.
      // If we do make sure it is not pending to start.
      // Else stop the current widget.
      if (_.isDefined(state)) {
        prevStartPromise = this['_' + regionId +'Promise'];
        if (prevStartPromise.state() === "pending") {

          prevStartPromise.done(onPrevStartDone);
        } else {
          prevStopPromise = this.sandbox.stop(state);
          // prevStopPromise
        }
      } else {
        onPrevStopDone();
      }
    }
  };

  return Manager;
});