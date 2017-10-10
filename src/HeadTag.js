import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import canUseDOM from './canUseDom';
import buildSelector from './buildSelector';

export default class HeadTag extends Component {
  static contextTypes = {
    reactHeadTags: PropTypes.object,
  };

  static propTypes = {
    tag: PropTypes.string,
  };

  static defaultProps = {
    tag: 'meta',
  };

  componentWillMount() {
    if (canUseDOM) {
      const { tag, children, ...rest } = this.props; // eslint-disable-line react/prop-types
      const ssrTags = document.head.querySelector(
        `${tag}${buildSelector(rest)}[data-reactroot=""]`
      );
      /* istanbul ignore else */
      if (ssrTags) {
        ssrTags.remove();
      }
    }
  }

  render() {
    const { tag: Tag, ...rest } = this.props;

    const Comp = <Tag {...rest} />;

    if (canUseDOM) {
      return ReactDOM.createPortal(Comp, document.head);
    }

    this.context.reactHeadTags.add(Comp);

    return null;
  }
}
