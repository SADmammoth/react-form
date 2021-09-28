import React from 'react';

import { isEmpty } from 'lodash-es';

import createInput from '../createInput';
import createInputProps from '../formStateHelpers/createInputProps';
import Input from '@/basic/Input';

export default function mapGroups(
  inputs,
  values,
  updateValueCallback,
  additionalFields,
) {
  const inputsGroups = {};

  if (!inputs || isEmpty(inputs)) return inputs;

  Object.values(inputs).forEach((input) => {
    if (inputs[input.name]?.hidden) return;
    if (input.group) {
      if (!inputsGroups[input.group.id]) {
        inputsGroups[input.group.id] = {
          $title: input.group.title,
          [input.name]: createInput(
            input,
            values,
            updateValueCallback,
            additionalFields,
          ),
        };
        return;
      }

      inputsGroups[input.group.id][input.name] = createInput(
        input,
        values,
        updateValueCallback,
        additionalFields,
      );
      return;
    }

    inputsGroups[input.name] = createInput(
      input,
      values,
      updateValueCallback,
      additionalFields,
    );
  });

  return inputsGroups;
}
