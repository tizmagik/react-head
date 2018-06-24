import React from 'react';
import { render } from 'enzyme';
import HeadCollector from '../HeadCollector';
import HeadTag from '../HeadTag';

describe('HeadCollector', () => {
  it('adds HeadTags to given array from component tree', () => {
    const arr = [];
    render(
      <HeadCollector headTags={arr}>
        <div>
          <HeadTag tag="tag1" name="name1" another="value1" />
          <HeadTag tag="tag2" test="test2" third="value2" />
        </div>
      </HeadCollector>
    );

    expect(arr.length).toBe(2);
    expect(arr).toMatchSnapshot();
  });
});
