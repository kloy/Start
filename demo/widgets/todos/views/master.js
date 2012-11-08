define(function (require) {

  'use strict';

  var View = require('backbone').View,
      _ = require('util');

  return View.extend({

    template: require('text!../templates/todos.html'),

    initialize: function initialize () {

      this.template = _.tmpl(this.template);
      this.render();
    },

    render: function render () {

      this.$el.html(this.template());

      return this;
    }
  });
});