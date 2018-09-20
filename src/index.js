import * as React from 'react';
import HeadTag from './HeadTag';

const renderTitle = (headTags, children) =>
  headTags.titleTemplate.replace('%s', `${children}`);

export const Title = props => (
  <HeadTag outputTemplate={renderTitle} tag="title" {...props} />
);

export const Style = props => <HeadTag tag="style" {...props} />;

export const Meta = props => <HeadTag tag="meta" {...props} />;

export const Link = props => <HeadTag tag="link" {...props} />;

export { default as HeadProvider } from './HeadProvider';
