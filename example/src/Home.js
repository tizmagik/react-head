import React from 'react';
import HeadTag from 'react-head';
import { Link } from 'react-router-dom';
import logo from './react.svg';
import './Home.css';

const Home = () => (
  <div className="Home">
    <HeadTag tag="title">Home | Example react-head App</HeadTag>
    <HeadTag tag="link" rel="canonical" content="http://jeremygayed.com/" />
    <HeadTag tag="meta" name="example" content="whatever" />
    <div className="Home-header">
      <img src={logo} className="Home-logo" alt="logo" />
      <h2>react-head example</h2>
    </div>
    <p className="Home-intro">
      View the example code in <code>src/Home.js</code>. Note that this works isomorphically.
    </p>
    <p>Click the example contact page below to see how the Header tags will update</p>
    <Link to="/contact">Contact Page</Link>
    <ul className="Home-resources">
      <li>
        <a href="https://github.com/tizmagik/react-head">Docs</a>
      </li>
      <li>
        <a href="https://github.com/tizmagik/react-head/issues">Issues</a>
      </li>
    </ul>
  </div>
);

export default Home;
