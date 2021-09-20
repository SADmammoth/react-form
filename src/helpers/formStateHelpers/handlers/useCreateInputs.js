import { difference, includes, intersection, isArray } from 'lodash-es';

import createInputProps from '../createInputProps';

export default function useCreateInputs(
  updateValueCallback,
  highlightInput,
  notifications,
  inputAdditionalFields,
) {
  return (inputsProps, valuesState) => {
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
        inputAdditionalFields,
      );
      inputsData[props.name] = inputProps;
    });

    Object.entries(inputsData).forEach(([name, input]) => {
      if (input.control && inputsData[input.control.field]) {
        if (isArray(input.value)) {
          const avaliableValues = Object.keys(input.control.map);
          const common = input.value.find((x) =>
            includes(avaliableValues, x.value || x),
          );
          if (common) {
            inputsData[input.control.field][input.control.prop] =
              input.control.map[common];
            return;
          }
        }
        if (input.control.map[input.value] !== undefined) {
          inputsData[input.control.field][input.control.prop] =
            input.control.map[input.value];
          return;
        }
        if (input.control.map['*'] !== undefined) {
          inputsData[input.control.field][input.control.prop] =
            input.control.map['*'];
        }
      } else if (input.control) {
        console.error(
          `Incorrect control by '${name}': no such field '${input.control.field}'`,
        );
      }
    });

    return inputsData;
  };
}
