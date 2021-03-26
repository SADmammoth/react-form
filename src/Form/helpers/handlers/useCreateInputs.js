import React from 'react';

import Input from '../../../Input/Input';
import createInputProps from '../createInputProps';

export default function useCreateInputs(
  updateValueCallback,
  highlightInput,
  notifications,
  render
) {
  return (inputsProps, valuesState) => {
    if (!Object.keys(valuesState).length) {
      return {};
    }

    const inputsData = {};

    inputsProps.forEach((props) => {
      const inputProps = createInputProps(
        props,
        updateValueCallback,
        valuesState,
        highlightInput,
        notifications,
        render
      );
      inputsData[props.name] = <Input {...inputProps} />;
    });

    return inputsData;
  };
}
