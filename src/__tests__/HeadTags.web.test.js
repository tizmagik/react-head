import * as React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

const ReactDOMMock = {
  createPortal: jest.fn(() => 'createPortal'),
};
jest.setMock('react-dom', ReactDOMMock);
const removeMock = jest.fn();
const qsMock = jest.fn(() => ({
  remove: removeMock,
}));
document.head.querySelector = qsMock;

describe('HeadTag during client rendering', () => {
  // eslint-disable-next-line global-require
  const { HeadTag, Title, Style, Meta, Link } = require('../');
  const globalCss = `p {
    color: #121212;
  }`;

  const Wrapper = ({ children }) => <div>{children}</div>; // eslint-disable-line react/prop-types
  Wrapper.contextTypes = {
    reactHeadTags: PropTypes.object,
  };
  const arr = [];
  mount(
    <Wrapper>
      Yes render
      <HeadTag tag="test" name="x" content="testing" />
      <Title>Test title</Title>
      <Style>{globalCss}</Style>
      <Link href="index.css" />
      <Meta charset="utf-8" />
    </Wrapper>,
    {
      context: {
        reactHeadTags: {
          add: c => arr.push(c),
        },
      },
    }
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
});
