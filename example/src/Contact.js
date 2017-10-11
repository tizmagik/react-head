import React from 'react';
import HeadTag from 'react-head';
import { Link } from 'react-router-dom';
import logo from './react.svg';
import './Contact.css';

const Contact = () => (
  <div className="Contact">
    <HeadTag tag="title">Contact | Example react-head App</HeadTag>
    <HeadTag tag="link" rel="canonical" content="http://jeremygayed.com/" />
    <HeadTag tag="meta" name="keywords" content="Contact,Example,React,Header" />
    <div className="Contact-header">
      <img src={logo} className="Contact-logo" alt="logo" />
      <h2>react-head contact us page</h2>
    </div>
    <p className="Contact-intro">
      View the example code in <code>src/Contact.js</code>. Note that this works isomorphically.
    </p>
    <p>Click the example home page below to see how the Header tags will update</p>
    <Link to="/">Home</Link>
    <ul className="Contact-resources">
      <li>
        <a href="https://github.com/tizmagik/react-head">Docs</a>
      </li>
      <li>
        <a href="https://github.com/tizmagik/react-head/issues">Issues</a>
      </li>
    </ul>
  </div>
);

export default Contact;
