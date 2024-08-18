interface InterpolationSliderArg {
  min: number;
  max: number;
  value: number;
}

export const interpolation = ({ value, min, max }: InterpolationSliderArg) => {
  const numerator = 100 * (value - min);
  const denominator = max - min;
  return numerator / denominator;
};
