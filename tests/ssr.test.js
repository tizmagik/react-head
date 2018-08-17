/**
 * @jest-environment node
 */

import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HeadProvider, Title, Style, Meta, Link } from '../src';

test('renders nothing and adds tags to headTags context array', () => {
  const arr = [];
  const markup = renderToStaticMarkup(
    <HeadProvider headTags={arr}>
      <div>
        Yes render
        <Title>Title</Title>
        <Style>{`body {}`}</Style>
        <Link href="index.css" />
        <Meta charSet="utf-8" />
      </div>
    </HeadProvider>
  );
  expect(markup).toMatchSnapshot();
  expect(arr).toMatchSnapshot();
});

test('renders only the last title', () => {
  const arr = [];
  renderToStaticMarkup(
    <HeadProvider headTags={arr}>
      <div>
        <Title>Title 1</Title>
      </div>
      <div>
        <Title>Title 2</Title>
      </div>
      <div>
        <Title>Title 3</Title>
      </div>
    </HeadProvider>
  );
  expect(arr).toMatchSnapshot();
});

test('renders only the last meta with the same name', () => {
  const arr = [];
  renderToStaticMarkup(
    <HeadProvider headTags={arr}>
      <Meta>Meta 1</Meta>
      <Meta>Meta 2</Meta>
      <Meta name="1">Meta 3</Meta>
      <Meta name="2">Meta 4</Meta>
      <Meta name="3">Meta 5</Meta>
      <Meta name="2">Meta 6</Meta>
    </HeadProvider>
  );
  expect(arr).toMatchSnapshot();
});

test('renders only last meta with the same property', () => {
  const arr = [];
  renderToStaticMarkup(
    <HeadProvider headTags={arr}>
      <Meta property="name1">Meta 1</Meta>
      <Meta property="name1">Meta 2</Meta>
      <Meta property="name2">Meta 3</Meta>
      <Meta name="name2">Meta 4</Meta>
      <Meta name="name3">Meta 5</Meta>
      <Meta property="name3">Meta 6</Meta>
    </HeadProvider>
  );
  expect(arr).toMatchSnapshot();
});

test('fails if headTags is not passed to <HeadProvider />', () => {
  expect(() => {
    renderToStaticMarkup(
      <HeadProvider>
        <Style>{`body {}`}</Style>
      </HeadProvider>
    );
  }).toThrowError(/headTags array should be passed/);
});

test('fails if headTags is not an array', () => {
  expect(() => {
    renderToStaticMarkup(
      <HeadProvider headTags={{}}>
        <Style>{`body {}`}</Style>
      </HeadProvider>
    );
  }).toThrowError(/headTags array should be passed/);
});

test('throw error if head tag is rendered without HeadProvider', () => {
  const errorFn = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => {
    renderToStaticMarkup(<Style>{`body {}`}</Style>);
  }).toThrowError(/<HeadProvider \/> should be in the tree/);
  errorFn.mockRestore();
});
