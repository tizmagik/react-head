import * as React from 'react';
import { render } from 'enzyme';
import { HeadProvider, HeadTag } from '../';

describe('HeadProvider', () => {
  it('adds HeadTags to given array from component tree', () => {
    const arr = [];
    render(
      <HeadProvider headTags={arr}>
        <div>
          <HeadTag tag="tag1" name="name1" another="value1" />
          <HeadTag tag="tag2" test="test2" third="value2" />
        </div>
      </HeadProvider>
    );

    expect(arr.length).toBe(2);
    expect(arr).toMatchSnapshot();
  });
});
