import React, { Component } from 'react';
import logo from './react.svg';
import './Home.css';
import HeadTag from 'react-head';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <HeadTag tag="title">Title of page</HeadTag>
        <HeadTag tag="link" rel="canonical" content="http://jeremygayed.com/" />
        <HeadTag tag="meta" name="example" content="whatever" />
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>react-head example</h2>
        </div>
        <p className="Home-intro">
          View the example code in <code>src/Home.js</code>. Note that this works isomorphically.
        </p>
        <ul className="Home-resources">
          <li>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </li>
          <li>
            <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
          </li>
          <li>
            <a href="https://palmer.chat">Community Slack</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
