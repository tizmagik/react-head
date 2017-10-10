import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import HeadTag from '../HeadTag';
import HeadCollector from '../HeadCollector';

describe('HeadTag during server rendering', () => {
  const arr = [];
  const markup = renderToStaticMarkup(
    <HeadCollector headTags={arr}>
      <div>
        Yes render
        <HeadTag tag="test" content="testing tag">
          No render
        </HeadTag>
      </div>
    </HeadCollector>,
    {
      context: {
        reactHeadTags: {
          add: c => arr.push(c),
        },
      },
    }
  );
  it('renders nothing', () => {
    expect(markup).toMatchSnapshot();
  });
  it('adds tags to headTags context array', () => {
    expect(arr).toMatchSnapshot();
  });
});
