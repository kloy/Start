require.config({
  // [RequireJS](http://requirejs.org/) 2.0+ plus has error callbacks (errbacks)
  // which provide per-require error handling. To utilize this feature
  // enforceDefine must be enabled and non-AMD dependencies must be shimmed.
  enforceDefine: true,

  baseUrl: "./",

  deps: ['shim'],

  // paths
  paths: {
    // RequireJS Text Plugin
    text: '../components/requirejs-text/text',
    // moment
    moment: '../components/moment/moment',
    // jQuery
    jquery: '../components/jquery/jquery',
    // Underscore
    underscore: '../components/underscore-amd/underscore',
    // Backbone
    backbone: '../components/backbone-amd/backbone',
    // log lib
    log: '../src/lib/log',
    // mediator lib
    mediator: '../src/lib/mediator',
    // widget lib
    widget: '../src/lib/widget',
    // util lib
    util: '../src/lib/util',
    // statelet ext
    statelet: '../src/ext/statelet',
    // view ext
    view: '../src/ext/view',
    // shim ext
    shim: '../src/ext/shim'
  },

  // shim underscore(lodash) & backbone (cause we use the non AMD versions here)
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

// kickoff app
define(function (require) {
  'use strict';

  var App = require('./app'),
      app = new App();
});

