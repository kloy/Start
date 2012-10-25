define(function (require) {

  'use strict';

  var BB = require('backbone'),
      $ = require('jquery'),
      Layout,
      log = require('log');

  Layout = BB.View.extend({
    // node attributes
    attributes: {
      id: '#example'
    },

    initialize: function (options) {
      this.render();
    },

    // the template for the layout
    template: function () { return ''; },

    // available regions for the layout.
    regions: {},

    // render the template
    render: function () {

      this.$el.html(this.template());

      return this;
    },

    // append a dom node to a region
    append: function (region, $node) {

      this.$el.find(this.regions[region]).append($node);

      return this;
    },

    // empty a region
    empty: function (region) {

      this.$el.find(this.regions[region]).empty();

      return this;
    },

    // shortcut for empty and appending to a region
    swap: function (region, $node) {

      this.empty(region);
      this.append(region, $node);

      return this;
    },

    // make a region visible
    show: function (region) {

      this.$el.find(this.regions[region]).show();

      return this;
    },

    // make a region hidden
    hide: function (region) {

      this.$el.find(this.regions[region]).hide();

      return this;
    }
  });

  return Layout;
});