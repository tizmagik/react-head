import * as React from 'react';
import TestRenderer from 'react-test-renderer';

jest.setMock('react-dom', {
  createPortal: children => <>{children}</>,
});

describe('HeadProvider', () => {
  const { HeadProvider, Style } = require('../');

  it('adds HeadTags to given array from component tree', () => {
    const arr = [];
    TestRenderer.create(
      <HeadProvider headTags={arr}>
        <div>
          <Style name="name1" another="value1" />
          <Style test="test2" third="value2" />
        </div>
      </HeadProvider>
    );

    expect(arr.length).toBe(2);
    expect(arr).toMatchSnapshot();
  });
});
