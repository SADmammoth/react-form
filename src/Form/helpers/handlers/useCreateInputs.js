import React from 'react';

import Input from '../../../Input/Input';
import createInputProps from '../createInputProps';

export default function useCreateInputs(
  updateValueCallback,
  highlightInput,
  notifications,
  render
) {
  return (inputsProps, valuesState, onInputsUpdate) => {
    if (!Object.keys(valuesState).length) {
      return {};
    }

    const inputsData = {};

    inputsProps.forEach(({ group, ...props }) => {
      const inputProps = createInputProps(
        props,
        updateValueCallback,
        valuesState,
        highlightInput,
        notifications,
        render
      );

      if (group) {
        inputsData[group] = {
          ...inputsData[group],
          [props.name]: <Input {...inputProps} />,
        };
      } else {
        inputsData[props.name] = <Input {...inputProps} />;
      }

      onInputsUpdate(inputsData);
    });

    return inputsData;
  };
}
