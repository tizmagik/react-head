import escapeStringRegexp from 'escape-string-regexp';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { HeadProvider } from 'react-head';
import App from '../../App';

const renderMiddleware = () => (req, res) => {
  let html = req.html;

  const routerContext = {};
  const headTags = []; // mutated during render so you can include in server-rendered template later
  const htmlContent = renderToString(
    <HeadProvider headTags={headTags}>
      <StaticRouter location={req.url} context={routerContext}>
        <App />
      </StaticRouter>
    </HeadProvider>
  );

  // Here is where we update the server-rendered template
  const htmlReplacements = {
    HTML_CONTENT: htmlContent, // server-rendered app
    REACT_HEAD_CONTENT: renderToString(headTags), // react-head content
  };
  Object.keys(htmlReplacements).forEach(key => {
    const value = htmlReplacements[key];
    html = html.replace(
      new RegExp('__' + escapeStringRegexp(key) + '__', 'g'),
      value
    );
  });

  if (routerContext.url) {
    res.redirect(302, routerContext.url);
  } else {
    res.send(html);
  }
};

export default renderMiddleware;
