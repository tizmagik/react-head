'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _canUseDom = require('./canUseDom');

var _canUseDom2 = _interopRequireDefault(_canUseDom);

var _buildSelector = require('./buildSelector');

var _buildSelector2 = _interopRequireDefault(_buildSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadTag = function (_Component) {
  _inherits(HeadTag, _Component);

  function HeadTag() {
    _classCallCheck(this, HeadTag);

    return _possibleConstructorReturn(this, (HeadTag.__proto__ || Object.getPrototypeOf(HeadTag)).apply(this, arguments));
  }

  _createClass(HeadTag, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (_canUseDom2.default) {
        var _props = this.props,
            tag = _props.tag,
            rest = _objectWithoutProperties(_props, ['tag']);

        var ssrMeta = document.querySelector('' + tag + (0, _buildSelector2.default)(rest) + '[data-reactroot=""]');
        if (ssrMeta) {
          ssrMeta.remove();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          Tag = _props2.tag,
          rest = _objectWithoutProperties(_props2, ['tag']);

      var Comp = _react2.default.createElement(Tag, rest);

      if (_canUseDom2.default) {
        return _reactDom2.default.createPortal(Comp, document.head);
      }

      this.context.reactHeadTags.add(Comp);

      return null;
    }
  }]);

  return HeadTag;
}(_react.Component);

HeadTag.contextTypes = {
  reactHeadTags: _propTypes2.default.object
};
HeadTag.propTypes = {
  tag: _propTypes2.default.string
};
HeadTag.defaultProps = {
  tag: 'meta' // TODO: Maybe create some aliases so this isn't needed
};
exports.default = HeadTag;