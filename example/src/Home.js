/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, Meta, Title, Style, Base } from 'react-head';
import { Link as RouterLink } from 'react-router-dom';
import Footer from './Footer';
import logo from './logo.svg';
import './Home.css';

const NestedComponent = () => (
  <Meta name="example" content="cascading example" />
);

const Home = () => (
  <div className="Home">
    <Title>Home | Example react-head App</Title>
    <Style>{`p {
      color: #121212;
    }`}</Style>
    <Link rel="canonical" content="http://jeremygayed.com/" />
    <Meta name="example" content="whatever" />
    <Base href="/"></Base>
    <div className="Home-header">
      <img src={logo} className="Home-logo" alt="logo" />
      <h2>react-head example</h2>
    </div>
    <p className="Home-intro">
      View the example code in <code>src/Home.js</code>. Note that this works
      isomorphically.
      <NestedComponent />
    </p>
    <p>
      Click the example contact page below to see how the Header tags will
      update
    </p>
    <RouterLink to="contact">Contact Page</RouterLink>
    <Footer />
  </div>
);

export default Home;
