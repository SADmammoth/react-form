import React from 'react';

import { isEmpty } from 'lodash-es';

import Input from '@/basic/Input';

export default function mapGroups(inputs, inputsProps) {
  const inputsGroups = {};

  if (!inputs || isEmpty(inputs)) return inputs;

  inputsProps.forEach((input) => {
    if (inputs[input.name]?.hidden) return;
    if (input.group && input.type !== 'subform') {
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
