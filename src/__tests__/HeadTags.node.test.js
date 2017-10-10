import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import HeadTag from '../HeadTag';

jest.mock('../canUseDom', () => false);

describe('HeadTag during server rendering', () => {
  const Wrapper = ({ children }) => <div>{children}</div>; // eslint-disable-line react/prop-types
  Wrapper.contextTypes = {
    reactHeadTags: PropTypes.object,
  };
  const arr = [];
  const wrapper = mount(
    <Wrapper>
      Yes render
      <HeadTag tag="test" content="testing tag">
        No render
      </HeadTag>
    </Wrapper>,
    {
      context: {
        reactHeadTags: {
          add: c => arr.push(c),
        },
      },
    }
  );
  it('renders nothing', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('adds tags to headTags context array', () => {
    expect(arr).toMatchSnapshot();
  });
});
