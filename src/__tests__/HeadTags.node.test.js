import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HeadProvider, Title, Style, Meta, Link } from '../';

describe('head tag during server', () => {
  it('renders nothing and adds tags to headTags context array', () => {
    const arr = [];
    const globalCss = `p {
      color: #121212;
    }`;
    const markup = renderToStaticMarkup(
      <HeadProvider headTags={arr}>
        <div>
          Yes render
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

  it('renders only the last title', () => {
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

  it('renders only the last meta with the same name', () => {
    const arr = [];
    renderToStaticMarkup(
      <HeadProvider headTags={arr}>
        <Meta>Meta 1</Meta>
        <Meta>Meta 2</Meta>
        <Meta name="1">Meta 3</Meta>
        <Meta name="2">Meta 4</Meta>
        <Meta name="3">Meta 5</Meta>
        <Meta name="2">Meta 6</Meta>
      </HeadProvider>
    );
    expect(arr).toMatchSnapshot();
  });
});
