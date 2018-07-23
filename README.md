# react-head  [![npm Version](https://img.shields.io/npm/v/react-head.svg?style=flat-square)](https://www.npmjs.org/package/react-head) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md#pull-requests)

Asynchronous SSR-ready Document Head management for React 16.3+

> 📙Note this documentation is for as-yet unreleased v3 of react-head which you can install with `npm i react-head@next`. You can view [the latest stable v2.2.0 docs here](https://github.com/tizmagik/react-head/tree/v2.2.0).

## Motivation

This module allows you to define `document.head` tags anywhere in your component hiearchy. The motivations are similar to [react-helmet](https://github.com/nfl/react-helmet) in that you may only have the information for certain tags contextually deep in your component hiearchy. There are no dependencies (it does not use react-side-effects) and it should work fine with asynchronous rendering; the only requirement is React 16.3+.

[Read more about react-head and how it works on Medium](https://jeremygayed.com/making-head-tag-management-thread-safe-with-react-head-323654170b45)

## Installation

```
npm i react-head
```

## How it works

1. On the server, you wrap your App in `<HeadProvider />` with a given `headTags[]` array
1. Then call `renderToString(headTags)` and include in the `<head />` block of your server template
1. To insert head tags within your app, just render `<HeadTag />` components as often as needed.

On the server, the tags are collected in the `headTags[]` array, and then on the client the server-generated tags are removed in favor of the client-rendered tags so that SPAs still work as expected (e.g. in cases where subsequent pageloads need to change the head tags).

> You can view a fully working sample app in the [/example](/example) folder.

### Server setup

Wrap your app with `<HeadProvider />` on the server with a given `headTags[]` array to pass down as part of your server-rendered payload.

```js
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { HeadProvider } from 'react-head';
import App from './App';

// ... within the context of a request ...

const context = {};
const headTags = [];
const app = renderToString(
  <HeadProvider headTags={headTags}>
    <App />
  </HeadProvider>
);

res.send(`
  <!doctype html>
    <head>
      ${renderToString(headTags)}
    </head>
    <body>
      <div id="root">${app}</div>
    </body>
  </html>
`)
```

### Client setup

There is nothing special required on the client, just render `<HeadTag />` components whenever you want to inject a tag in the `<head />`.

```js
import * as React from 'react';
import { HeadTag } from 'react-head';

const App = () => (
   <div className="Home">
      <HeadTag tag="title">Title of page</HeadTag>
      <HeadTag tag="link" rel="canonical" content="http://jeremygayed.com/" />
      <HeadTag tag="meta" name="example" content="whatever" />
      // ...
  </div>
)
```

### Usage

The following aliases are also available for use (just convenience components that pre-fill the `tag` prop in `<HeadTag />`):

```js
import { HeadTag, Title, Style, Meta, Link } from 'react-head';
```

## Contributing

Please follow the [contributing docs](/CONTRIBUTING.md)


