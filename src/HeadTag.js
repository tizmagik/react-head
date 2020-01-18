import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
    const { tag } = this.props;
    this.headTags.removeClientTag(tag, this.index);
  }

  render() {
    const { tag: Tag, ...rest } = this.props;
    const { canUseDOM } = this.state;

    return (
      <Consumer>
        {headTags => {
          if (headTags == null) {
            throw Error('<HeadProvider /> should be in the tree');
          }

          this.headTags = headTags;

          if (canUseDOM) {
            if (!headTags.shouldRenderTag(Tag, this.index)) {
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
