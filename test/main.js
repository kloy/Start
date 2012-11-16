require.config({
  // [RequireJS](http://requirejs.org/) 2.0+ plus has error callbacks (errbacks)
  // which provide per-require error handling. To utilize this feature
  // enforceDefine must be enabled and non-AMD dependencies must be shimmed.
  enforceDefine: true,

  baseUrl: "./",

  // I like to use this for things that aren't really modules, but need to be
  // ran. Modules modifying jQuery or JS prototypes are good examples.
  deps: [
    'shim',
    'jquerypp/event/destroyed'
  ],

  // paths
  paths: {
    // RequireJS Text Plugin
    text: '../components/requirejs-text/text',
    // moment
    moment: '../components/moment/moment',
    // jQuery
    jquery: '../components/jquery/jquery',
    'jquerypp/styles': '../../src/vendor/jquerypp/styles',
    'jquerypp/animate': '../../src/vendor/jquerypp/animate',
    'jquerypp/event/key': '../../src/vendor/jquerypp/event/key',
    'jquerypp/event/destroyed': '../src/vendor/jquerypp/event/destroyed',
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
  }
});

// kickoff app
define(function (require) {

  'use strict';

  var tests = [
    '../src/tests/vendor',
    '../src/tests/util'
  ];

  require(tests, QUnit.start);
});

