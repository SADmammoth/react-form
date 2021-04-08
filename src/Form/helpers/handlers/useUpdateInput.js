import React from 'react';

import Input from '../../../Input/Input';
import createInputProps from '../createInputProps';

export default function useUpdateInput() {
  return (inputProps, newValue, inputName, valuesState, inputsState) => {
    const { group, ...foundProps } = inputProps.find(
      (inputProp) => inputProp.name === inputName
    );

    const props = { value: newValue, ...foundProps };
    const newInputsState = { ...inputsState, [inputName]: props };
    return newInputsState;
  };
}
