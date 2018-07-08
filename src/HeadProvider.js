import * as React from 'react';
import PropTypes from 'prop-types';
import { Provider } from './headTagsContext';

export default class HeadProvider extends React.Component {
  static propTypes = {
    headTags: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
  };

  headTags = {
    add: tag => this.props.headTags.push(tag),
  };

  render() {
    return (
      <Provider value={this.headTags}>
        {React.Children.only(this.props.children)}
      </Provider>
    );
  }
}
