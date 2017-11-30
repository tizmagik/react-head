import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import buildSelector from './buildSelector';

export default class HeadTag extends Component {
  static contextTypes = {
    reactHeadTags: PropTypes.object,
  };

  static propTypes = {
    tag: PropTypes.string,
    staticSSR: PropTypes.bool,
  };

  static defaultProps = {
    tag: 'meta',
    staticSSR: false,
  };

  state = {
    canUseDOM: false,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ canUseDOM: true });

    const { staticSSR, tag, children, ...rest } = this.props; // eslint-disable-line react/prop-types
    const ext = staticSSR ? '' : '[data-reactroot=""]';
    const ssrTags = document.head.querySelector(`${tag}${buildSelector(rest)}${ext}`);

    /* istanbul ignore else */
    if (ssrTags) {
      ssrTags.remove();
    }
  }

  render() {
    const { staticSSR, tag: Tag, ...rest } = this.props;

    const Comp = <Tag {...rest} />;

    if (this.state.canUseDOM) {
      return ReactDOM.createPortal(Comp, document.head);
    }

    // on client we don't require HeadCollector
    if (this.context.reactHeadTags) {
      this.context.reactHeadTags.add(Comp);
    }

    return null;
  }
}
