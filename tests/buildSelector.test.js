import buildSelector from '../src/buildSelector';

describe('buildSelector', () => {
  it('builds selector based on given object', () => {
    expect(
      buildSelector({
        one: 'first',
        two: 'second',
        three: 'third',
      })
    ).toMatchSnapshot();
  });
});
