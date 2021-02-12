import React from 'react';

import Input from '../../../Input/Input';
import createInputProps from '../createInputProps';

export default function useCreateInputs(
  updateValueCallback,
  renderLoader,
  highlightInput
) {
  return (inputsProps, valuesState, onInputsUpdate) => {
    if (!Object.keys(valuesState).length) {
      return {};
    }

    const inputsData = {};

    inputsProps.forEach((props) => {
      const inputProps = createInputProps(
        props,
        updateValueCallback,
        valuesState,
        renderLoader,
        highlightInput
      );
      inputsData[props.name] = <Input {...inputProps} />;
      onInputsUpdate(inputsData);
    });

    return inputsData;
  };
}
