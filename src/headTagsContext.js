import * as React from 'react';

export const { Consumer, Provider } = React.createContext({
  // on client we don't require HeadCollector
  list: [],
  addClientTag: () => -1,
  addServerTag: () => {},
});
