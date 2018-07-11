// @flow

import * as React from 'react';
import { HeadProvider, HeadTag, Title, Style, Meta, Link } from '../';

[
  <HeadProvider headTags={[]}>
    <div />
  </HeadProvider>,
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
