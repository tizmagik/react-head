import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { HeadProvider } from 'react-head';
import App from './App';

hydrate(
  <BrowserRouter>
    <HeadProvider>
      <App />
    </HeadProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
