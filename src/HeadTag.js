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

  componentDidMount() {
    this.setState({ canUseDOM: true });

    const { tag, children, ...rest } = this.props;
    const ssrTags = document.head.querySelector(
      `${tag}${buildSelector(rest)}[data-rh=""]`
    );

    if (ssrTags) {
      ssrTags.remove();
    }
  }

  render() {
    const { tag: Tag, ...rest } = this.props;

    if (this.state.canUseDOM) {
      const Comp = <Tag {...rest} />;
      return ReactDOM.createPortal(Comp, document.head);
    }

    return (
      <Consumer>
        {headTags => {
          const ServerComp = <Tag data-rh="" {...rest} />;
          headTags.add(ServerComp);
        }}
      </Consumer>
    );
  }
}
