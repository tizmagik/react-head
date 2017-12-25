'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadCollector = function (_Component) {
  _inherits(HeadCollector, _Component);

  function HeadCollector() {
    _classCallCheck(this, HeadCollector);

    return _possibleConstructorReturn(this, (HeadCollector.__proto__ || Object.getPrototypeOf(HeadCollector)).apply(this, arguments));
  }

  _createClass(HeadCollector, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        reactHeadTags: {
          add: function add(c) {
            return _this2.props.headTags.push(c);
          }
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return HeadCollector;
}(_react.Component);

HeadCollector.propTypes = {
  headTags: _propTypes2.default.array.isRequired, // eslint-disable-line react/forbid-prop-types
  children: _propTypes2.default.node.isRequired
};
HeadCollector.childContextTypes = {
  reactHeadTags: _propTypes2.default.object
};
exports.default = HeadCollector;