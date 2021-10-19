import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HeadProvider, Title, Style, Meta, Link, Base, Script, Static } from '../src';

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
        <Base href="/new_base" />
        <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context": "http://schema.org","@type":"WebSite"}) }}/>
        <Static json={[
          {type:'tag',name:'meta',attribs:{proprty:'og:title',content:'example'}},
          {type:'tag',name:'link',attribs:{rel:'canonical',href:'https://example.com'}},
        ]}/>
      </div>
    </HeadProvider>,
    root
  );

  expect(document.head.innerHTML).toMatchSnapshot();
});
