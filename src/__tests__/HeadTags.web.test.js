import React from 'react';
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
  const HeadTag = require('../HeadTag').default;

  const Wrapper = ({ children }) => <div>{children}</div>; // eslint-disable-line react/prop-types
  Wrapper.contextTypes = {
    reactHeadTags: PropTypes.object,
  };
  const arr = [];
  mount(
    <Wrapper>
      Yes render
      <HeadTag tag="meta" name="x" content="testing" />
      <HeadTag tag="title">Test title</HeadTag>
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
    expect(qsMock).toHaveBeenCalledWith('meta[name="x"][content="testing"][data-reactroot=""]');
    expect(qsMock).toHaveBeenCalledWith('title[data-reactroot=""]');
    expect(removeMock).toHaveBeenCalledTimes(2);
  });
  it('renders into document.head portal', () => {
    expect(ReactDOMMock.createPortal).toHaveBeenCalledTimes(2);
    expect(ReactDOMMock.createPortal).toHaveBeenCalledWith(expect.any(Object), document.head);
  });
});
