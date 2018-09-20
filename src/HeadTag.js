import * as React from 'react';
import * as ReactDOM from 'react-dom';
import invariant from 'tiny-invariant';
import { Consumer } from './context';

export default class HeadTag extends React.Component {
  static defaultProps = {
    outputTemplate: (h, s) => s,
  };
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
    const { tag: Tag, children, outputTemplate, ...rest } = this.props;

    return (
      <Consumer>
        {headTags => {
          invariant(headTags, '<HeadProvider /> should be in the tree');

          this.headTags = headTags;

          if (this.state.canUseDOM) {
            if (!headTags.shouldRenderTag(Tag, this.index)) {
              return null;
            }

            const ClientComp = (
              <Tag {...rest}>{outputTemplate(headTags, children)}</Tag>
            );
            return ReactDOM.createPortal(ClientComp, document.head);
          }

          const ServerComp = (
            <Tag data-rh="" {...rest}>
              {outputTemplate(headTags, children)}
            </Tag>
          );
          headTags.addServerTag(ServerComp);
          return null;
        }}
      </Consumer>
    );
  }
}
