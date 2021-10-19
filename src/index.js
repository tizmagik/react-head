import * as React from 'react';
import HeadTag from './HeadTag';

export const Title = props => <HeadTag tag="title" {...props} />;

export const Style = props => <HeadTag tag="style" {...props} />;

export const Meta = props => <HeadTag tag="meta" {...props} />;

export const Link = props => <HeadTag tag="link" {...props} />;

export const Base = props => <HeadTag tag="base" {...props} />;

/**
 * WARNING Script tags NOT FOR INJECTING CODE - use this for things like <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}/>
 */
export const Script = props => <HeadTag tag="script" {...props} />;

export { default as HeadProvider } from './HeadProvider';

/**
 * No attempt is made to de-duplicate tags provided by Static and those provied by <Meta> and <Title>
 */
export { default as Static } from './HeadStaticTag';
