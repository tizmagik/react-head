import * as React from 'react';
import * as plug from 'react-powerplug';
import TestRenderer from 'react-test-renderer';
import './ReactDOMMock';
import { HeadProvider, Title, Style, Meta, Link } from '../src';

test('renders into document.head portal', () => {
  const renderer = TestRenderer.create(
    <HeadProvider>
      <div>
        Yes render
        <Title>Test title</Title>
        <Style>{`body {}`}</Style>
        <Link href="index.css" />
        <Meta charSet="utf-8" />
      </div>
    </HeadProvider>
  );
  expect(renderer.toJSON()).toMatchSnapshot();
});

test('renders only the last title', () => {
  const renderer = TestRenderer.create(
    <HeadProvider>
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
  expect(renderer.toJSON()).toMatchSnapshot();
});

test('mounts and unmounts title', () => {
  const renderer = TestRenderer.create(
    <HeadProvider>
      <Title>Static</Title>
      <plug.Toggle initial={false}>
        {title => (
          <>
            {title.on && <Title>Dynamic</Title>}
            <button onClick={title.toggle}>toggle</button>
          </>
        )}
      </plug.Toggle>
    </HeadProvider>
  );
  expect(renderer.toJSON()).toMatchSnapshot();
  // mount
  renderer.root.findByType('button').props.onClick();
  expect(renderer.toJSON()).toMatchSnapshot();
  // unmount
  renderer.root.findByType('button').props.onClick();
  expect(renderer.toJSON()).toMatchSnapshot();
});

test('switches between titles', () => {
  const renderer = TestRenderer.create(
    <HeadProvider>
      <Title>Static</Title>
      <plug.Value initial={null}>
        {title => (
          <>
            {title.value === 0 && <Title>Title 1</Title>}
            <button onClick={() => title.set(0)}>0</button>
            {title.value === 1 && <Title>Title 2</Title>}
            <button onClick={() => title.set(1)}>1</button>
          </>
        )}
      </plug.Value>
    </HeadProvider>
  );
  expect(renderer.toJSON()).toMatchSnapshot();
  // enable 0
  renderer.root.findAllByType('button')[0].props.onClick();
  expect(renderer.toJSON()).toMatchSnapshot();
  // switch to 1
  renderer.root.findAllByType('button')[1].props.onClick();
  expect(renderer.toJSON()).toMatchSnapshot();
  // switch to 0
  renderer.root.findAllByType('button')[0].props.onClick();
  expect(renderer.toJSON()).toMatchSnapshot();
});

test('renders only the last meta with the same name', () => {
  const renderer = TestRenderer.create(
    <HeadProvider>
      <Meta>Static 1</Meta>
      <Meta name="name1">Static 2</Meta>
      <plug.Toggle initial={false}>
        {meta => (
          <>
            {meta.on && <Meta name="name1">Dynamic 1</Meta>}
            <button onClick={meta.toggle}>toggle</button>
          </>
        )}
      </plug.Toggle>
      <plug.Toggle initial={false}>
        {meta => (
          <>
            {meta.on && <Meta>Dynamic 2</Meta>}
            <button onClick={meta.toggle}>toggle</button>
          </>
        )}
      </plug.Toggle>
    </HeadProvider>
  );
  expect(renderer.toJSON()).toMatchSnapshot();
  // mount first
  renderer.root.findAllByType('button')[0].props.onClick();
  expect(renderer.toJSON()).toMatchSnapshot();
  // mount second
  renderer.root.findAllByType('button')[1].props.onClick();
  expect(renderer.toJSON()).toMatchSnapshot();
  // unmount second
  renderer.root.findAllByType('button')[1].props.onClick();
  expect(renderer.toJSON()).toMatchSnapshot();
  // unmount first
  renderer.root.findAllByType('button')[0].props.onClick();
  expect(renderer.toJSON()).toMatchSnapshot();
});

test('renders only last meta with the same property', () => {
  const renderer = TestRenderer.create(
    <HeadProvider>
      <Meta property="name1">Meta 1</Meta>
      <Meta property="name1">Meta 2</Meta>
      <Meta property="name2">Meta 3</Meta>
      <Meta name="name2">Meta 4</Meta>
      <Meta name="name3">Meta 5</Meta>
      <Meta property="name3">Meta 6</Meta>
    </HeadProvider>
  );
  expect(renderer.toJSON()).toMatchSnapshot();
});

test('throws error if head tag is rendered without HeadProvider', () => {
  const errorFn = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => {
    TestRenderer.create(<Style>{`body {}`}</Style>);
  }).toThrowError(/<HeadProvider \/> should be in the tree/);
  errorFn.mockRestore();
});
