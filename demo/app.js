define(function (require) {

  'use strict';

  var log = require('log'),
      Todos = require('./widgets/todos/todos'),
      Mediator = require('mediator'),
      $ = require('jquery');

  function App () {

    this._hub = new Mediator();

    log.info('App Started');
    this.todos = new Todos();
    this.todos.start(this._hub);
    $('#main-content').append(this.todos.$el);
    this.todos.stop();
  }

  return App;
});