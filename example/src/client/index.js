import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';

import './index.css';
import App from '../App';

ReactDOM.hydrate(
  <HeadProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HeadProvider>,
  document.getElementById('root')
);
