import * as React from 'react';
import HeadTag from './HeadTag';
import HeadProvider from './HeadProvider';

export const Title = props => <HeadTag tag="title" {...props} />;

export const Style = props => <HeadTag tag="style" {...props} />;

export const Meta = props => <HeadTag tag="meta" {...props} />;

export const Link = props => <HeadTag tag="link" {...props} />;

export default HeadProvider;

export { HeadTag, HeadProvider };
