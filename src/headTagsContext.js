import React from 'react';

export const { Consumer, Provider } = React.createContext({
  // on client we don't require HeadCollector
  add: () => {},
});
