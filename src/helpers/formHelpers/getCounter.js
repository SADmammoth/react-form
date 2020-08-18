export default function getCounter(value, min, max, step) {
  let newValue = value;
  let product = (newValue - min) / step;

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
