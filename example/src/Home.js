import React from 'react';
import {HeadTag, Link, Title, Meta, Style} from 'react-head';
import logo from './react.svg';
import './Home.css';

const Home = () => (
  <div className="Home">
    {<Title>This is a react app!</Title>}
    {/*<HeadTag tag="title">Example react-head App</HeadTag>*/}
    {<Link rel="canonical" content="http://jeremygayed.com" />}
    {/*<HeadTag tag="link" rel="canonical" content="http://jeremygayed.com/" />*/}
    {/*<HeadTag tag="meta" name="example" content="whatever" />*/}
    {<Meta name="example" content="whatever" />}
    <div className="Home-header">
      <img src={logo} className="Home-logo" alt="logo" />
      <h2>react-head example</h2>
    </div>
    <p className="Home-intro">
      View the example code in <code>src/Home.js</code>. Note that this works isomorphically.
    </p>
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
