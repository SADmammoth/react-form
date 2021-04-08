import React from 'react';
import _ from 'lodash';
import Input from '../../Input/Input';

export default function mapGroups(inputs, inputsProps) {
  const inputsGroups = {};
  if (!inputs || _.isEmpty(inputs)) return inputs;
  inputsProps.forEach((input) => {
    if (input.group) {
      if (!inputsGroups[input.group.id]) {
        inputsGroups[input.group.id] = {
          $title: input.group.title,
          [input.name]: <Input {...inputs[input.name]} />,
        };
      } else {
        inputsGroups[input.group.id][input.name] = (
          <Input {...inputs[input.name]} />
        );
      }
    } else {
      inputsGroups[input.name] = <Input {...inputs[input.name]} />;
    }
  });

  return inputsGroups;
}
