import maskEscapedCharsRegex from './regexps/maskEscapedCharsRegex';
import maskSpecialCharsRegex from './regexps/maskSpecialCharsRegex';

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
