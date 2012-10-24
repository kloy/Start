define(function (require) {

  'use strict';

  return function () {

    var Backbone = require('backbone'),
        mediator = Object.create(Backbone.Events);

    return {
      subscribe: function () {

        mediator.on.apply(mediator, arguments);
      },
      unsubscribe: function () {

        mediator.off.apply(mediator, arguments);
      },
      publish: function () {

        mediator.trigger.apply(mediator, arguments);
      }
    };
  };
});