import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import buildSelector from './buildSelector';
import { Consumer } from './headTagsContext';

export default class HeadTag extends Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
  };

  state = {
    canUseDOM: false,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ canUseDOM: true });

    const { tag, children, ...rest } = this.props; // eslint-disable-line react/prop-types
    const ssrTags = document.head.querySelector(`${tag}${buildSelector(rest)}[data-rh=""]`);

    /* istanbul ignore else */
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
