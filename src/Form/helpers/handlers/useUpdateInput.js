import React from 'react';

import Input from '../../../Input/Input';
import createInputProps from '../createInputProps';

export default function useUpdateInput(
  updateValueCallback,
  highlightInput,
  render
) {
  return (inputProps, newValue, inputName, valuesState, inputsState) => {
    const { group, ...foundProps } = inputProps.find(
      (inputProp) => inputProp.name === inputName
    );
    const props = createInputProps(
      foundProps,
      updateValueCallback,
      valuesState,
      highlightInput,
      render
    );

    let newInputsState;

    if (group) {
      newInputsState = {
        ...inputsState,
        [group]: {
          ...newInputsState[group],
          [inputName]: <Input {...foundProps} />,
        },
      };
    } else {
      newInputsState = {
        ...inputsState,
        [inputName]: <Input {...foundProps} />,
      };
    }

    return newInputsState;
  };
}
