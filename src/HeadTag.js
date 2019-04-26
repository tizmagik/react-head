import * as React from 'react';
import * as ReactDOM from 'react-dom';
import invariant from 'tiny-invariant';
import { Consumer } from './context';

export default class HeadTag extends React.Component {
  state = {
    canUseDOM: false,
  };

  headTags = null;
  index = -1;

  componentDidMount() {
    const { tag, name, property } = this.props;
    this.setState({ canUseDOM: true });
    this.index = this.headTags.addClientTag(tag, name || property);
  }

  componentWillUnmount() {
    this.headTags.removeClientTag(this.props.tag, this.index);
  }

  render() {
    const { tag: Tag, ...rest } = this.props;

    return (
      <Consumer>
        {headTags => {
          invariant(headTags, '<HeadProvider /> should be in the tree');

          this.headTags = headTags;

          if (this.state.canUseDOM) {
            if (!headTags.shouldRenderTag(Tag, this.index)) {
              return null;
            }
            const ClientComp = <Tag {...rest} />;
            return ReactDOM.createPortal(ClientComp, document.head);
          }

          // disable `data-rh` if <HeadProvider whitelist /> matches Tag
          const dataAttribute = `${headTags.whitelist}`.split(`,`).includes(Tag)
            ? {}
            : { 'data-rh': `` };
          const ServerComp = <Tag {...dataAttribute} {...rest} />;
          headTags.addServerTag(ServerComp);
          return null;
        }}
      </Consumer>
    );
  }
}
