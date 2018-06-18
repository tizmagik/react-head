import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import buildSelector from './buildSelector';

export default class HeadTag extends Component {
  constructor() {
    super();
    this.state = {
      canUseDOM: false,
    };
  }
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

    // on client we don't require HeadCollector
    if (this.context.reactHeadTags) {
      const ServerComp = <Tag data-rh="" {...rest} />;
      this.context.reactHeadTags.add(ServerComp);
    }

    return null;
  }
}
// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV !== 'production'
  ? (HeadTag.contextTypes = {
      reactHeadTags: PropTypes.object,
    })
  : undefined;

// eslint-disable-next-line no-unused-expressions
process.env.NODE_ENV !== 'production'
  ? (HeadTag.propTypes = {
      tag: PropTypes.string,
    })
  : undefined;

HeadTag.defaultProps = {
  tag: 'meta',
};
