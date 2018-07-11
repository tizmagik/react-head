import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HeadProvider, HeadTag, Title, Style, Meta, Link } from '../';

describe('HeadTag during server rendering', () => {
  it('renders nothing and adds tags to headTags context array', () => {
    const arr = [];
    const globalCss = `p {
      color: #121212;
    }`;
    const markup = renderToStaticMarkup(
      <HeadProvider headTags={arr}>
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
      </HeadProvider>
    );
    expect(markup).toMatchSnapshot();
    expect(arr).toMatchSnapshot();
  });

  it('render only the last title', () => {
    const arr = [];
    renderToStaticMarkup(
      <HeadProvider headTags={arr}>
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
    expect(arr).toMatchSnapshot();
  });
});
