'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var canUseDOM = !!(typeof window !== 'undefined' && window.document);

exports.default = canUseDOM;