'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint no-useless-escape:0 */
var buildSelector = function buildSelector(obj) {
  return Object.keys(obj).map(function (k) {
    var cnt = String(obj[k]).replace(/["\\]/g, '\\$&');
    return '[' + k + '="' + cnt + '"]';
  }).join('');
};

exports.default = buildSelector;