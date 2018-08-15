import * as React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import { Provider } from './context';

const cascadingTags = ['title', 'meta'];

export default class HeadProvider extends React.Component {
  static propTypes = {
    headTags: PropTypes.array,
    children: PropTypes.node.isRequired,
  };

  indices = new Map();

  state = {
    addClientTag: (tag, name) => {
      // consider only cascading tags
      if (cascadingTags.indexOf(tag) !== -1) {
        this.setState(state => {
          const names = state[tag] || [];
          return { [tag]: [...names, name] };
        });
        // track indices synchronously
        const { indices } = this;
        const index = indices.has(tag) ? indices.get(tag) + 1 : 0;
        indices.set(tag, index);
        return index;
      }
      return -1;
    },

    shouldRenderTag: (tag, index) => {
      if (cascadingTags.indexOf(tag) === -1) {
        return true;
      }
      const names = this.state[tag];
      // check if the tag is the last one of similar
      return names && names.lastIndexOf(names[index]) === index;
    },

    removeClientTag: (tag, index) => {
      this.setState(state => {
        const names = state[tag];
        if (names) {
          names[index] = null;
          return { [tag]: names };
        }
        return null;
      });
    },

    addServerTag: tagNode => {
      const headTags = this.props.headTags || [];
      // tweak only cascading tags
      if (cascadingTags.indexOf(tagNode.type) !== -1) {
        const index = headTags.findIndex(
          prev =>
            prev.type === tagNode.type && prev.props.name === tagNode.props.name
        );
        if (index !== -1) {
          headTags.splice(index, 1);
        }
      }
      headTags.push(tagNode);
    },
  };

  componentDidMount() {
    const ssrTags = document.head.querySelectorAll(`[data-rh=""]`);
    ssrTags.forEach(ssrTag => ssrTag.remove());
  }

  render() {
    invariant(
      typeof window !== 'undefined' || this.props.headTags,
      'headTags should be passed to <HeadProvider /> in node'
    );
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
