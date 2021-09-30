/* eslint-disable no-param-reassign */
import React from 'react';
import Validator from '@/Validator';
import regexpEscape from '@/Validator/helpers/regexpEscape';
import getUniqueItems from '@/helpers/getUniqueItems';
import replaceAll from '@/helpers/replaceAll';
import addMask from '@/maskHelpers/addMask';
import getValueFromMask from '@/maskHelpers/getValueFromMask';
import placeInputCursorToEnd from '@/maskHelpers/placeInputCursorToEnd';
import maskNotSpecialCharsRegex from '@/maskHelpers/regexps/maskNotSpecialCharsRegex';

function VisibleMask(input, maskArray) {
  if (maskArray[input.props.value.length]) {
    if (input.props.value && input.props.value !== '') {
      return input;
    }
  }

  const handleBackspaceInMask = (event) => {
    const { target } = event;
    const { value } = event.target;
    const start = target.selectionStart - 1;
    const end = target.selectionEnd;

    const charsToDelete = regexpEscape(
      getUniqueItems(
        maskArray.filter((maskElement) =>
          maskElement.match(maskNotSpecialCharsRegex),
        ),
      ).join(''),
    );

    const charsToDeleteRegex = new RegExp(`[^${charsToDelete}]`, 'g');

    event.target.value = replaceAll(value, start, end, charsToDeleteRegex, '_');
    event.target.setSelectionRange(start, start);

    input.props.onChange(event);
  };

  const onClick = (event) => {
    placeInputCursorToEnd(event.target, maskArray);
  };

  const onFocus = (event) => {
    event.target.value = addMask(event.target.value, maskArray);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Backspace') {
      handleBackspaceInMask(event);
    }

    if (
      Validator.maskByChar(
        getValueFromMask(event.target.value) + event.key,
        maskArray.join(''),
      ) &&
      input.props.byCharValidator(
        getValueFromMask(event.target.value) + event.key,
      )
    ) {
      event.target.value = addMask(
        getValueFromMask(event.target.value) + event.key,
        maskArray,
      );
      input.props.onChange(event);
      placeInputCursorToEnd(event.target, maskArray);
    }

    event.preventDefault();
  };

  const onBlur = (event) => {
    event.target.value = getValueFromMask(
      event.target.value,
      maskArray.join(''),
    );
  };

  return React.cloneElement(input, {
    onClick,
    onFocus,
    onKeyDown,
    onBlur,
  });
}

export default VisibleMask;
