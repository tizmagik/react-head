'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HeadTag);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HeadTag.__proto__ || Object.getPrototypeOf(HeadTag)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      canUseDOM: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HeadTag, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ canUseDOM: true });

      var _props = this.props,
          tag = _props.tag,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['tag', 'children']); // eslint-disable-line react/prop-types


      var ssrTags = document.head.querySelector('' + tag + (0, _buildSelector2.default)(rest) + '[data-rh=""]');

      /* istanbul ignore else */
      if (ssrTags) {
        ssrTags.remove();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          Tag = _props2.tag,
          rest = _objectWithoutProperties(_props2, ['tag']);

      if (this.state.canUseDOM) {
        var Comp = _react2.default.createElement(Tag, rest);
        return _reactDom2.default.createPortal(Comp, document.head);
      }

      // on client we don't require HeadCollector
      if (this.context.reactHeadTags) {
        var ServerComp = _react2.default.createElement(Tag, _extends({ 'data-rh': '' }, rest));
        this.context.reactHeadTags.add(ServerComp);
      }

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
  tag: 'meta'
};
exports.default = HeadTag;