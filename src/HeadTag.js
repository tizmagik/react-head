import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import buildSelector from './buildSelector';
import { Consumer } from './headTagsContext';

export default class HeadTag extends React.Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
  };

  state = {
    canUseDOM: false,
  };

  headTags = null;
  index = -1;

  componentDidMount() {
    this.setState({ canUseDOM: true });

    const { tag, children, ...rest } = this.props;
    const ssrTags = document.head.querySelector(
      `${tag}${buildSelector(rest)}[data-rh=""]`
    );

    if (ssrTags) {
      ssrTags.remove();
    }
    this.index = this.headTags.addClientTag(tag);
  }

  render() {
    const { tag: Tag, ...rest } = this.props;

    return (
      <Consumer>
        {headTags => {
          this.headTags = headTags;

          if (this.state.canUseDOM) {
            if (
              Tag === 'title' &&
              headTags.list.lastIndexOf(Tag) !== this.index
            ) {
              return null;
            }
            const ClientComp = <Tag {...rest} />;
            return ReactDOM.createPortal(ClientComp, document.head);
          }

          const ServerComp = <Tag data-rh="" {...rest} />;
          headTags.addServerTag(ServerComp);
          return null;
        }}
      </Consumer>
    );
  }
}
