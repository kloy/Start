define(function (require) {

  'use strict';

  var BB = require('backbone'),
      View;

  View = BB.View.extend({

    destroy: function () {

      this.undelegateEvents();

      if (this.onDestroy) {

        this.onDestroy();
      }
    }
  });

  View.sub = View.extend;

  return View;
});