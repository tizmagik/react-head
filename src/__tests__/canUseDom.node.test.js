/**
 * @jest-environment node
 */

import canUseDom from '../canUseDom';

describe('canUseDom', () => {
  it('returns false on the server', () => {
    expect(canUseDom).toBe(false);
  });
});
