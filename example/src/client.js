import React from 'react';
import { hydrate } from 'react-dom';
import { HeadProvider } from 'react-head';
import App from './App';

hydrate(
  <HeadProvider whitelist="title">
    <App />
  </HeadProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
