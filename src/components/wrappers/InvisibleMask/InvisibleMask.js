/* eslint-disable no-param-reassign */
import React from 'react';
import replaceSubstring from '@/helpers/replaceSubstring';
import getMaskCharsBeforePlaceholder from '@/maskHelpers/getMaskCharsBeforePlaceholder';
import invisibleMaskOnInputValue from '@/maskHelpers/invisibleMaskOnInputValue';
import placeInputCursorToEnd from '@/maskHelpers/placeInputCursorToEnd';
import Validator from '../../../Validator';
import getValueFromMask from '../../../helpers/maskHelpers/getValueFromMask';

function InvisibleMask(input, maskArray) {
  const { name, onChange: inputOnChange, onBlur: inputOnBlur } = input.props;

  const onFocus = (event) => {
    if (!event.target.value || event.target.value === '') {
      event.target.value = getMaskCharsBeforePlaceholder(maskArray);
      placeInputCursorToEnd(event.target, maskArray);
    }
  };

  const onKeyPress = (event) => {
    if (event.key.includes('Arrow') || event.key === 'Delete') {
      event.preventDefault();
    }

    if (event.key === 'Backspace') {
      const { target } = event;
      const { value } = event.target;
      const start = target.selectionStart - 1;
      const end = target.selectionEnd;

      event.target.value = replaceSubstring(value, start, end, '');
      inputOnChange(event);
      event.preventDefault();
    }

    const {
      target: { value },
      key,
    } = event;

    let newValue = getValueFromMask(value) + key;
    newValue = value + key;

    if (!Validator.maskByChar(newValue, maskArray.join(''))) {
      event.preventDefault();
    }
  };

  const onChange = (event) => {
    inputOnChange(
      invisibleMaskOnInputValue(name, event.target.value, maskArray),
    );
  };

  const onBlur = (event) => {
    if (inputOnBlur) inputOnBlur(event);
  };

  return React.cloneElement(input, {
    onFocus,
    onKeyPress,
    onChange,
    onBlur,
  });
}

export default InvisibleMask;
