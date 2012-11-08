// Defines a way for a widget to communicate with the core
// This vent should be passed to a widget when starting it.
// Permissions would be implemented here if we cared about security of events
// between widgets and core.
define(function () {

  'use strict';

  function Vent (coreMediator) {

    this._mediator = coreMediator;
  }

  Vent.prototype = {

    subscribe: function () {

      this._mediator.subscribe.apply(this._mediator, arguments);

      return this;
    },

    unsubscribe: function () {

      this._mediator.unsubscribe.apply(this._mediator, arguments);

      return this;
    },

    publish: function () {

      this._mediator.publish.apply(this._mediator, arguments);

      return this;
    }
  };

  return Vent;
});