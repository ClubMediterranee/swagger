export const bouncyInterpolation = (
  start: string,
  end: string,
  milestone: number,
  bounceBackAmount: number,
): { range: number[]; output: string[] } => {
  return {
    range: [0, milestone, 1 - milestone, 1],
    output: [
      `calc(${start} + 0px)`,
      `calc(${start} + ${bounceBackAmount * -1}px)`,
      `calc(${end} + ${bounceBackAmount * 1}px)`,
      `calc(${end} + 0px)`,
    ],
  };
};
