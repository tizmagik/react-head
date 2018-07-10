import * as React from 'react';
import PropTypes from 'prop-types';
import { Provider } from './headTagsContext';

export default class HeadProvider extends React.Component {
  static propTypes = {
    headTags: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
  };

  index = -1;

  state = {
    list: [],
    addClientTag: tag => {
      this.setState(state => ({
        list: [...state.list, tag],
      }));
      this.index += 1;
      return this.index;
    },
    addServerTag: tag => {
      const { headTags } = this.props;
      if (tag.type === 'title') {
        const index = headTags.findIndex(prev => prev.type === 'title');
        if (index !== -1) {
          headTags.splice(index, 1);
        }
      }
      headTags.push(tag);
    },
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
