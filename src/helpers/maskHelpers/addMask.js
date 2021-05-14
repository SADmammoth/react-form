import maskEscapedCharsRegex from './maskEscapedCharsRegex';
import maskSpecialCharsRegex from './maskSpecialCharsRegex';

export default function addMask(string, maskArray) {
  const mask = string.length
    ? maskArray.slice(string.length).join('')
    : maskArray.join('');
  return (
    string +
    mask
      .replace(maskSpecialCharsRegex, '_')
      .replace(maskEscapedCharsRegex, '$1')
  );
}
