import maskEscapedCharsOrEmptyRegex from '@/maskHelpers/regexps/maskEscapedCharsOrEmptyRegex';
import InvisibleMask from '../InvisibleMask';
import VisibleMask from '../VisibleMask';

function Mask(input, mask, type = 'default') {
  const resultInput = input;
  if (input.props.type === 'textarea' || input.props.type === 'select') {
    return input;
  }

  const maskArray = mask
    .split(maskEscapedCharsOrEmptyRegex)
    .filter((el) => !!el);

  return type === 'invisible'
    ? InvisibleMask(resultInput, maskArray)
    : VisibleMask(resultInput, maskArray);
}

export default Mask;
