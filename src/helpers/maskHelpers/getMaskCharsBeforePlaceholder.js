import maskEscapedCharsRegex from './maskEscapedCharsRegex';
import maskSpecialCharsRegex from './maskSpecialCharsRegex';

export default function getMaskCharsBeforePlaceholder(maskArray) {
  const firstPlaceholder = maskArray.findIndex((el) =>
    maskSpecialCharsRegex.test(el),
  );
  if (firstPlaceholder < 0) {
    return maskArray.join('').replace(maskEscapedCharsRegex, '$1');
  }
  return maskArray
    .splice(0, firstPlaceholder)
    .join('')
    .replace(maskEscapedCharsRegex, '$1');
}
