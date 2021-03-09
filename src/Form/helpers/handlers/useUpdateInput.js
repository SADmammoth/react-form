import React from 'react';

import Input from '../../../Input/Input';
import createInputProps from '../createInputProps';

export default function useUpdateInput(
  updateValueCallback,
  onInputsUpdate,
  renderLoader,
  highlightInput,
  renderInput
) {
  return (inputProps, newValue, inputName, valuesState, inputsState) => {
    const { group, ...foundProps } = inputProps.find(
      (inputProp) => inputProp.name === inputName
    );
    const props = createInputProps(
      foundProps,
      updateValueCallback,
      valuesState,
      renderLoader,
      highlightInput,
      renderInput
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

    onInputsUpdate(newInputsState);
    return newInputsState;
  };
}
