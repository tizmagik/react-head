import * as React from 'react';
import * as plug from 'react-powerplug';
import TestRenderer from 'react-test-renderer';

const ReactDOMMock = {
  createPortal: jest.fn(children => <>{children}</>),
};
jest.setMock('react-dom', ReactDOMMock);
const removeMock = jest.fn();
const qsMock = jest.fn(() => ({
  remove: removeMock,
}));
document.head.querySelector = qsMock;

describe('HeadTag during client rendering', () => {
  const { HeadProvider, HeadTag, Title, Style, Meta, Link } = require('../');
  const globalCss = `p {
    color: #121212;
  }`;

  TestRenderer.create(
    <div>
      Yes render
      <HeadTag tag="test" name="x" content="testing" />
      <Title>Test title</Title>
      <Style>{globalCss}</Style>
      <Link href="index.css" />
      <Meta charset="utf-8" />
    </div>
  );

  it('removes head tags added during ssr', () => {
    expect(qsMock).toHaveBeenCalledWith(
      'test[name="x"][content="testing"][data-rh=""]'
    );
    expect(qsMock).toHaveBeenCalledWith('title[data-rh=""]');
    expect(qsMock).toHaveBeenCalledWith('style[data-rh=""]');
    expect(qsMock).toHaveBeenCalledWith('link[href="index.css"][data-rh=""]');
    expect(qsMock).toHaveBeenCalledWith('meta[charset="utf-8"][data-rh=""]');
    expect(removeMock).toHaveBeenCalledTimes(5);
  });

  it('renders into document.head portal', () => {
    expect(ReactDOMMock.createPortal).toHaveBeenCalledTimes(5);
    expect(ReactDOMMock.createPortal).toHaveBeenCalledWith(
      expect.any(Object),
      document.head
    );
  });

  it('renders only the last title', () => {
    const renderer = TestRenderer.create(
      <HeadProvider headTags={[]}>
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

  it('mounts and unmounts title', () => {
    const renderer = TestRenderer.create(
      <HeadProvider headTags={[]}>
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

  it('switches between titles', () => {
    const renderer = TestRenderer.create(
      <HeadProvider headTags={[]}>
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
});
