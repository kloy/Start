define(function (require) {

  'use strict';

  var View = require('view'),
      _ = require('util');

  return View.extend({

    template: require('text!../templates/todos.html'),

    options: {
      cidPrefix: 'todos-master-view-'
    },

    initialize: function initialize () {

      this.render();
    },

    render: function render () {

      this.$el.html(this.template());

      return this;
    }
  });
});