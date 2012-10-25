require.config({
  // [RequireJS](http://requirejs.org/) 2.0+ plus has error callbacks (errbacks)
  // which provide per-require error handling. To utilize this feature
  // enforceDefine must be enabled and non-AMD dependencies must be shimmed.
  enforceDefine: true,

  baseUrl: "./scripts",

  // paths
  paths: {
    // jQuery
    jquery: '../components/jquery/jquery',
    // Underscore
    underscore: '../components/underscore/underscore',
    // Backbone
    backbone: '../components/backbone/backbone',
    // RequireJS Text Plugin
    text: '../components/requirejs-text/text',
    // log plugin
    log: './plugins/log',
    // mediator plugin,
    mediator: './plugins/mediator',
    // util plugin
    util: './plugins/util',
    // sandbox plugin
    sandbox: './plugins/sandbox',
    // statemachine plugin
    stateMachine: './plugins/statemachine',
    // layout plugin
    layout: './plugins/layout'
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

  var app = require('./demo/app')();

  return false;
});

