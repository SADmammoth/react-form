import React from 'react';

import Input from '../../../Input/Input';
import createInputProps from '../createInputProps';

export default function useUpdateInput(
  updateValueCallback,
  onInputsUpdate,
  highlightInput,
  render
) {
  return (inputProps, newValue, inputName, valuesState, inputsState) => {
    const foundProps = inputProps.find(
      (inputProp) => inputProp.name === inputName
    );
    const props = createInputProps(
      { value: newValue, ...foundProps },
      updateValueCallback,
      valuesState,
      highlightInput,
      render
    );
    const newInput = <Input {...props} />;
    const newInputsState = { ...inputsState, [inputName]: newInput };

    onInputsUpdate(newInputsState);
    return newInputsState;
  };
}
