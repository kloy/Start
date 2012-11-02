define(function (require) {

  'use strict';

  var BB = require('backbone'),
      Collection;

  Collection = BB.Collection.extend({});
  // Alias sub to extend
  Collection.sub = Collection.extend;

  return Collection;
});