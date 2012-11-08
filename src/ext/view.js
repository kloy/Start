define(function (require) {

  'use strict';

  var BB = require('backbone'),
      View,
      _ = require('util'),
      log = require('log');

  View = BB.View.extend({

    options: {
      cidPrefix: 'base-view-'
    },

    constructor: function (options) {

      this._configure(options || {});
      this.cid = _.uniqueId(this.options.cidPrefix);
      this._ensureElement();
      // Ensure our templates are functions ready to go.
      if (_.isDefined(this.template)) {
        this.template = _.tmpl(this.template);
      }
      this.initialize.apply(this, arguments);
      // Listen for destroyed event on this.$el so we can auto cleanup this mess.
      if (_.isUndefined(this.events)) {
        this.events = {};
      }
      this.events.destroyed = 'destroy';
      this.delegateEvents();

      log.notice('View.constructor(): cid "' + this.cid + '" constructed.');
    },

    destroy: function () {

      this.undelegateEvents();
      log.notice('View.destroy(): cid "' + this.cid + '" destroyed.');
    }
  });

  return View;
});