import React from 'react';

import Input from '../../../Input/Input';
import createInputProps from '../createInputProps';

export default function useUpdateInput() {
  return (inputProps, newValue, inputName, valuesState, inputsState) => {
    const foundProps = inputProps.find(
      (inputProp) => inputProp.name === inputName
    );

    const props = { value: newValue, ...foundProps };
    const newInput = <Input {...props} />;
    const newInputsState = { ...inputsState, [inputName]: newInput };
    return newInputsState;
  };
}
