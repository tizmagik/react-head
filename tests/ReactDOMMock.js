import * as React from 'react';

export default jest.mock('react-dom', () => ({
  createPortal: (children, element) => {
    if (children == null) {
      throw Error('portal children should be provided');
    }
    if (element !== document.head) {
      throw Error('portal element should be document.head');
    }
    const Portal = `portal-${element.tagName.toLowerCase()}`;
    return <Portal>{children}</Portal>;
  },
}));
