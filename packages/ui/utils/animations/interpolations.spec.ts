import { bouncyInterpolation } from './interpolations';

describe('bouncyInterpolation', () => {
  it('returns the correct interpolation', () => {
    const start = '0px';
    const end = '100px';
    const milestone = 0.1;
    const bounceBackAmount = 10;

    const { range, output } = bouncyInterpolation(start, end, milestone, bounceBackAmount);

    expect(range).toEqual([0, milestone, 1 - milestone, 1]);
    expect(output).toEqual([
      `calc(${start} + 0px)`,
      `calc(${start} + ${bounceBackAmount * -1}px)`,
      `calc(${end} + ${bounceBackAmount * 1}px)`,
      `calc(${end} + 0px)`,
    ]);
  });
});
