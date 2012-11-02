define(function (require) {

  'use strict';

  var BB = require('backbone'),
      Model;

  Model = BB.Model({

  });

  // Alias sub to extend
  Model.sub = Model.extend;

  return Model;
});