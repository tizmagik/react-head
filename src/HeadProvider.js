import * as React from 'react';
import { Provider } from './context';

const cascadingTags = ['title', 'meta'];

export default class HeadProvider extends React.Component {
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
      if (cascadingTags.indexOf(tag) !== -1) {
        const names = this.state[tag]; // eslint-disable-line react/destructuring-assignment
        // check if the tag is the last one of similar
        return names && names.lastIndexOf(names[index]) === index;
      }
      return true;
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
      const { headTags = [] } = this.props;
      // tweak only cascading tags
      if (cascadingTags.indexOf(tagNode.type) !== -1) {
        const index = headTags.findIndex(prev => {
          const prevName = prev.props.name || prev.props.property;
          const nextName = tagNode.props.name || tagNode.props.property;
          return prev.type === tagNode.type && prevName === nextName;
        });
        if (index !== -1) {
          headTags.splice(index, 1);
        }
      }
      headTags.push(tagNode);
    },
  };

  componentDidMount() {
    const ssrTags = document.head.querySelectorAll(`[data-rh=""]`);
    // `forEach` on `NodeList` is not supported in Googlebot, so use a workaround
    Array.prototype.forEach.call(ssrTags, ssrTag =>
      ssrTag.parentNode.removeChild(ssrTag)
    );
  }

  render() {
    const { headTags, children } = this.props;

    if (typeof window === 'undefined' && Array.isArray(headTags) === false) {
      throw Error(
        'headTags array should be passed to <HeadProvider /> in node'
      );
    }

    return <Provider value={this.state}>{children}</Provider>;
  }
}
