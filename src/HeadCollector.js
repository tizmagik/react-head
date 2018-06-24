import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './headTagsContext';

export default class HeadCollector extends Component {
  static propTypes = {
    headTags: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node.isRequired,
  };

  headTags = {
    add: tag => this.props.headTags.push(tag),
  };

  render() {
    return <Provider value={this.headTags}>{React.Children.only(this.props.children)}</Provider>;
  }
}
