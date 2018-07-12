import * as React from 'react';
import PropTypes from 'prop-types';
import { Provider } from './headTagsContext';

const cascadingTags = ['title', 'meta'];

export default class HeadProvider extends React.Component {
  static propTypes = {
    headTags: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
  };

  index = -1;

  state = {
    list: [],
    addClientTag: (tag, name) => {
      this.setState(state => ({
        list: [...state.list, `${tag}:${name}`],
      }));
      this.index += 1;
      return this.index;
    },
    shouldRenderTag: index => {
      const { list } = this.state;
      const id = list[index];
      const [tag] = id.split(':');
      return cascadingTags.includes(tag) && list.lastIndexOf(id) === index;
    },
    removeClientTag: index => {
      this.setState(state => {
        const list = [...state.list];
        list[index] = null;
        return { list };
      });
    },
    addServerTag: tag => {
      const { headTags } = this.props;
      if (cascadingTags.includes(tag.type)) {
        const index = headTags.findIndex(
          prev => prev.type === tag.type && prev.props.name === tag.props.name
        );
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
