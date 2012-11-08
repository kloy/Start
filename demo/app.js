define(function (require) {

  'use strict';

  var log = require('log'),
      Todos = require('./widgets/todos/todos'),
      $ = require('jquery');

  function App () {

    log.info('App Started');
    this.todos = new Todos();
    this.todos.start();
    $('#main-content').append(this.todos.$el);
  }

  return App;
});