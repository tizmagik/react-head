import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Consumer } from './context';
import domToReact from "./domToReact"

export default class HeadStaticTag extends React.Component {
  state = {
    canUseDOM: false,
  };

  componentDidMount() {
    this.setState({ canUseDOM: true });
  }

  render() {
    const { canUseDOM } = this.state;

    return (
      <Consumer>
        {api => {
          if (api == null) {
            throw Error('<HeadProvider /> should be in the tree');
          }

          const { json } = this.props
          const components = domToReact(json)
          if (canUseDOM) {
            return ReactDOM.createPortal(components, document.head);
          }
          api.addServerComponents(components);
          return null;
        }}
      </Consumer>
    );
  }
}
