/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, Title, Meta } from 'react-head';
import { Link as RouterLink } from 'react-router-dom';
import Footer from './Footer';
import logo from './logo.svg';
import './Contact.css';

const NestedComponent = () => (
  <Title>Contact | Example react-head App (with cascading title)</Title>
);

const Contact = () => (
  <div className="Contact">
    <Title>Contact | Example react-head App</Title>
    <Link rel="canonical" content="http://jeremygayed.com/" />
    <Meta name="keywords" content="Contact,Example,React,Header" />
    <div className="Contact-header">
      <img src={logo} className="Contact-logo" alt="logo" />
      <h2>react-head contact us page</h2>
    </div>
    <NestedComponent />
    <p className="Contact-intro">
      View the example code in <code>src/Contact.js</code>. Note that this works
      isomorphically.
    </p>
    <p>
      Click the example home page below to see how the Header tags will update
    </p>
    <RouterLink to="/">Home</RouterLink>
    <Footer />
  </div>
);

export default Contact;
