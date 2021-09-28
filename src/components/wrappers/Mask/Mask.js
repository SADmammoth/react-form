import React from 'react';

import InvisibleMask from '../InvisibleMask';
import VisibleMask from '../VisibleMask';
import Validator from '@/Validator';
import getValueFromMask from '@/maskHelpers/getValueFromMask';
import maskEscapedCharsOrEmptyRegex from '@/maskHelpers/regexps/maskEscapedCharsOrEmptyRegex';

function Mask(input, mask, validate = false, type = 'default') {
  let resultInput = input;
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
