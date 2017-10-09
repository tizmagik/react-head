import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class HeadCollector extends Component {
  static propTypes = {
    headTags: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    reactHeadTags: PropTypes.object,
  };

  getChildContext() {
    return {
      reactHeadTags: {
        add: c => this.props.headTags.push(c),
      },
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
