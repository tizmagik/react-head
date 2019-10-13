import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import './App.css';

const App = () => (
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route exact path="/contact">
      <Contact />
    </Route>
  </Switch>
);

export default App;
