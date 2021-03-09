import React from 'react';

import Input from '../../../Input/Input';
import createInputProps from '../createInputProps';

export default function useCreateInputs(
  updateValueCallback,
  renderLoader,
  highlightInput,
  notifications,
  renderInput
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
        renderLoader,
        highlightInput,
        notifications,
        renderInput
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
