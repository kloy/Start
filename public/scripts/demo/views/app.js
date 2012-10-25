define(function (require) {

  'use strict';

  var _ = require('util'),
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
    template: _.tmpl(require('text!demo/templates/app.html'))
  });
});