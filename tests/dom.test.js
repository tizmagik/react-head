import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HeadProvider, Title, Style, Meta, Link } from '../src';

test('removes head tags added during ssr', () => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  document.head.innerHTML = `
      <title data-rh="">Test title</title>
      <style data-rh="">
        body {}
      </style>
      <link data-rh="" href="index.css" />
      <not-react-head-element />
    `;

  expect(document.head.innerHTML).toMatchSnapshot();

  ReactDOM.render(
    <HeadProvider>
      <div>
        Yes render
        <Title>Test title</Title>
        <Style>{`body {}`}</Style>
        <Link href="index.css" />
        <Meta charSet="utf-8" />
      </div>
    </HeadProvider>,
    root
  );

  expect(document.head.innerHTML).toMatchSnapshot();
});
