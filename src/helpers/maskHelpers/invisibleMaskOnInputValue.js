import maskEscapedCharsRegex from './regexps/maskEscapedCharsRegex';
import maskSpecialCharsRegex from './regexps/maskSpecialCharsRegex';

export default function invisibleMaskOnInputValue(name, value, maskArray) {
  return {
    target: {
      name,
      value:
        maskArray[value.length] &&
        !RegExp(maskSpecialCharsRegex.source, '').test(maskArray[value.length])
          ? value + maskArray[value.length].replace(maskEscapedCharsRegex, '$1')
          : value,
    },
  };
}
