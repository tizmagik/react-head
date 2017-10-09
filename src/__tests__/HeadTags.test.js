// import React from 'react';
// import HeadTag from '../HeadTag';

describe('HeadTag', () => {
  describe('during server rendering', () => {
    it('renders nothing');
    it('adds tags to headTags context array');
  });

  describe('during client rendering', () => {
    it('removes head tags added during ssr');
    it('renders into document.head portal');
  });
});
