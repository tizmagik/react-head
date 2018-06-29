// @flow

import * as React from 'react';
import { HeadCollector, HeadTag, Title, Style, Meta, Link } from '../';

[
  <HeadCollector headTags={[]}>
    <div />
  </HeadCollector>,
  // $FlowFixMe
  <HeadCollector headTags={[]} />,
  // $FlowFixMe
  <HeadCollector headTags={([]: $ReadOnlyArray<React.Element<>>)}>
    <div />
  </HeadCollector>,
  // $FlowFixMe
  <HeadCollector>
    <div />
  </HeadCollector>,
  <HeadTag tag="" />,
  // $FlowFixMe
  <HeadTag tag={1} />,
  // $FlowFixMe
  <HeadTag />,
  <Title />,
  <Style />,
  <Meta />,
  <Link />,
];
