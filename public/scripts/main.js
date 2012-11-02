require.config({
  // [RequireJS](http://requirejs.org/) 2.0+ plus has error callbacks (errbacks)
  // which provide per-require error handling. To utilize this feature
  // enforceDefine must be enabled and non-AMD dependencies must be shimmed.
  enforceDefine: true,

  baseUrl: "./scripts",

  deps: ['./lib/shim'],

  // paths
  paths: {
    // moment
    moment: '../components/moment/moment',
    // jQuery
    jquery: '../components/jquery/jquery',
    // Underscore
    underscore: '../components/underscore/underscore',
    // Backbone
    backbone: '../components/backbone/backbone',
    // RequireJS Text Plugin
    text: '../components/requirejs-text/text',
    // log lib
    log: './lib/log',
    // mediator lib
    mediator: './lib/mediator',
    // sandbox lib
    sandbox: './lib/sandbox',
    // statelet lib
    statelet: './lib/statelet',
    // util lib
    util: './lib/util',
    // view lib
    view: './lib/view',
    // model lib
    model: './lib/model',
    // collection lib
    collection: './lib/collection',
    // widget lib
    widget: './lib/widget'
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

  var App = require('./demo/app'),
      app = new App();
});

