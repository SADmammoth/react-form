export default function getCounter(
  value: number,
  min: number,
  max: number,
  step: number,
): number {
  let newValue = value;
  const product = (newValue - min) / step;

  if (step && step !== 1 && product !== Math.round(product)) {
    newValue = step * Math.round(product) + min;
  }

  if (newValue > max) {
    newValue = max;
  }

  if (newValue < min) {
    newValue = min;
  }

  return newValue;
}
