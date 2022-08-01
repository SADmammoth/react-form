export default function getValueFromMask(maskWithValue, emptyMask) {
  const firstPlaceholder = maskWithValue.indexOf('_');

  const value = maskWithValue.slice(
    0,
    firstPlaceholder < 0 ? maskWithValue.length : firstPlaceholder,
  );

  if (emptyMask && emptyMask.startsWith(value)) {
    return '';
  }

  return value;
}
