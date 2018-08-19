/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, Meta, Title, Style } from 'react-head';
import { Link as RouterLink } from 'react-router-dom';
import logo from './react.svg';
import './Home.css';

const Home = () => (
  <div className="Home">
    <Title>Home | Example react-head App</Title>
    <Style>{`p {
      color: #121212;
    }`}</Style>
    <Link rel="canonical" content="http://jeremygayed.com/" />
    <Meta name="example" content="whatever" />
    <div className="Home-header">
      <img src={logo} className="Home-logo" alt="logo" />
      <h2>react-head example</h2>
    </div>
    <p className="Home-intro">
      View the example code in <code>src/Home.js</code>. Note that this works
      isomorphically.
    </p>
    <p>
      Click the example contact page below to see how the Header tags will
      update
    </p>
    <RouterLink to="/contact">Contact Page</RouterLink>
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
