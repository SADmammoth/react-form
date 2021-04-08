import React from 'react';
import _ from 'lodash';
import Input from '../../Input/Input';

export default function mapGroups(inputs, inputsProps, render = true) {
  const inputsGroups = {};
  if (!inputs || _.isEmpty(inputs)) return inputs;
  inputsProps.forEach((input) => {
    if (input.group) {
      if (!inputsGroups[input.group.id]) {
        inputsGroups[input.group.id] = {
          $title: input.group.title,
          [input.name]: render ? (
            <Input {...inputs[input.name]} />
          ) : (
            inputs[input.name]
          ),
        };
      } else {
        inputsGroups[input.group.id][input.name] = render ? (
          <Input {...inputs[input.name]} />
        ) : (
          inputs[input.name]
        );
      }
    } else {
      inputsGroups[input.name] = render ? (
        <Input {...inputs[input.name]} />
      ) : (
        inputs[input.name]
      );
    }
  });

  return inputsGroups;
}
