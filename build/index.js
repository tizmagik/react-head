'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadCollector = undefined;

var _HeadCollector = require('./HeadCollector');

Object.defineProperty(exports, 'HeadCollector', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_HeadCollector).default;
  }
});

var _HeadTag = require('./HeadTag');

var _HeadTag2 = _interopRequireDefault(_HeadTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _HeadTag2.default;