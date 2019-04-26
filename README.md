# react-head [![npm Version](https://img.shields.io/npm/v/react-head.svg?style=flat-square)](https://www.npmjs.org/package/react-head) [![bundlephobia](https://badgen.net/bundlephobia/minzip/react-head)](https://bundlephobia.com/result?p=react-head) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md#pull-requests)

Asynchronous SSR-ready Document Head management for React 16.3+

## Motivation

This module allows you to define `document.head` tags anywhere in your component hierarchy. The motivations are similar to [react-helmet](https://github.com/nfl/react-helmet) in that you may only have the information for certain tags contextually deep in your component hiearchy. There are no dependencies (it does not use react-side-effects) and it should work fine with asynchronous rendering; the only requirement is React 16.3+.

[Read more about react-head and how it works on Medium](https://jeremygayed.com/making-head-tag-management-thread-safe-with-react-head-323654170b45)

## Installation

```sh
npm i react-head
```

or

```sh
yarn add react-head
```

## How it works

1.  You wrap your App with `<HeadProvider />`
1.  From the server, you pass `headTags[]` array to `<HeadProvider />`
1.  Then call `renderToStaticMarkup(headTags)` and include in the `<head />` block of your server template
1.  To insert head tags within your app, just render one of `<Title />`, `<Meta />`, `<Style />` and `<Link />` components as often as needed.

On the server, the tags are collected in the `headTags[]` array, and then on the client the server-generated tags are removed in favor of the client-rendered tags so that SPAs still work as expected (e.g. in cases where subsequent page loads need to change the head tags).

> You can view a fully working sample app in the [/example](/example) folder.

### Server setup

Wrap your app with `<HeadProvider />` on the server with a given `headTags[]` array to pass down as part of your server-rendered payload.

```js
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { HeadProvider } from 'react-head';
import App from './App';

// ... within the context of a request ...

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
`);
```

### Client setup

There is nothing special required on the client, just render one of head tag components whenever you want to inject a tag in the `<head />`.

```js
import * as React from 'react';
import { HeadProvider, Title, Link, Meta } from 'react-head';

const App = () => (
  <HeadProvider>
    <div className="Home">
      <Title>Title of page</Title>
      <Link rel="canonical" content="http://jeremygayed.com/" />
      <Meta name="example" content="whatever" />
      // ...
    </div>
  </HeadProvider>
);
```

## Disable data-rh attribute

`<HeadProvider/>` accepts an optional prop `whitelist` which accepts a comma separated CSS selector string just like `document.querySelector`. This allows `react-head` to know which tags it controlls without the need for the `data-rh` attribute, which might lead to problems with some HTML parsers of SEO tools for example.

### Example

```jsx
// on the server
<HeadProvider headTags={headTags} whitelist="title,[name="description"],[property^="og:"]">
  <App />
</HeadProvider>

// in the client
<HeadProvider whitelist="title,[name="description"],[property^="og:"]">
  <div id="app">
    <Title>Title of page</Title>
    // ...
  </div>
</HeadProvider>
```

## Contributing

Please follow the [contributing docs](/CONTRIBUTING.md)
