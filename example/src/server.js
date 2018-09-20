import React from 'react';
import { ServerLocation, isRedirect } from '@reach/router';
import express from 'express';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { HeadProvider } from 'react-head';
import App from './App';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const headTags = [];
    let markup;

    try {
      markup = renderToString(
        <ServerLocation url={req.url}>
          <HeadProvider
            headTags={headTags}
            titleTemplate="%s | Example react-head App"
          >
            <App />
          </HeadProvider>
        </ServerLocation>
      );
    } catch (error) {
      if (isRedirect(error)) {
        res.redirect(error.uri);
      } else {
        res.status(500).end(`An error occurred, ${error}`);
      }
    }

    res.status(200).send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
          ${renderToStaticMarkup(headTags)}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
    );
  });

export default server;
