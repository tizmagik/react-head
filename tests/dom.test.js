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

test('leaves headTags prop unmodified after render', () => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  const tags = [];
  ReactDOM.render(
    <HeadProvider headTags={tags}>
      <Title>Test title</Title>
    </HeadProvider>,
    root
  );

  expect(tags).toEqual([]);
});
