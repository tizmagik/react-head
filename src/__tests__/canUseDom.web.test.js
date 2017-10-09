/**
 * @jest-environment jsdom
 */
import canUseDom from '../canUseDom';

describe('canUseDom', () => {
  it('returns true in the browser', () => {
    expect(canUseDom).toBe(true);
  });
});
