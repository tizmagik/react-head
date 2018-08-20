import React from 'react';
import { Router } from '@reach/router';
import Home from './Home';
import Contact from './Contact';
import './App.css';

const App = () => (
  <Router>
    <Home path="/" />
    <Contact path="/contact" />
  </Router>
);

export default App;
