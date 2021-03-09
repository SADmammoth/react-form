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
    const foundProps = inputProps.find(
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
    const newInput = <Input {...props} />;
    const newInputsState = { ...inputsState, [inputName]: newInput };

    onInputsUpdate(newInputsState);
    return newInputsState;
  };
}
