define(function (require) {

  'use strict';

  var _ = require('underscore'),
      log = require('log'),
      Layout = require('layout');

  return Layout.extend({
    tagName: "section",
    attributes: {
      id: '#app'
    },
    // available regions for the layout.
    regions: {
      header: '#header',
      sidebar: '#sidebar',
      footer: '#footer'
    },
    template: _.template(require('text!demo/templates/app.html'))
  });
});