// @flow

import * as React from 'react';
import { HeadProvider, Title, Style, Meta, Link } from '../';

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
  <Title />,
  <Style />,
  <Meta />,
  <Link />,
];
