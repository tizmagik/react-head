import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HeadCollector, HeadTag, Title, Style, Meta, Link } from '../';

describe('HeadTag during server rendering', () => {
  const arr = [];
  const globalCss = `p {
    color: #121212;
  }`;
  const markup = renderToStaticMarkup(
    <HeadCollector headTags={arr}>
      <div>
        Yes render
        <HeadTag tag="test" content="testing tag">
          No render
        </HeadTag>
        <Title>Title</Title>
        <Style>{globalCss}</Style>
        <Link href="index.css" />
        <Meta charset="utf-8" />
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
