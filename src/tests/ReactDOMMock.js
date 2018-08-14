import * as React from 'react';
import invariant from 'tiny-invariant';

export default jest.mock('react-dom', () => ({
  createPortal: (children, element) => {
    invariant(children, 'portal children should be provided');
    invariant(
      element === document.head,
      'portal element should be document.head'
    );
    const Portal = `portal-${element.tagName.toLowerCase()}`;
    return <Portal>{children}</Portal>;
  },
}));
