'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var buildSelector = function buildSelector(obj) {
  return Object.keys(obj).map(function (k) {
    return '[' + k + '="' + obj[k] + '"]';
  }).join('');
};

exports.default = buildSelector;