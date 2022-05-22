import React, { ComponentClass } from 'react';
//@ts-ignore
import FieldGroup from '@/generic/FieldGroup';
import { InputsState, SharedInputProps, ValuesState } from '../types/basic';
import mapGroups from './mapGroups';

export default function renderGroups(
  inputs: InputsState,
  values: ValuesState,
  sharedInputProps: SharedInputProps,
  groupTag: ComponentClass<any>,
) {
  if (!inputs) return inputs;
  const mapped = mapGroups(inputs, values, sharedInputProps);

  return Object.entries(mapped).map(([name, inputData]) => {
    if (React.isValidElement(inputData) || !inputData) {
      return inputData;
    }

    const { $title, ...input } = inputData;
    const GroupTag = groupTag || FieldGroup;

    return (
      <GroupTag key={`group-${name}`} name={name} title={$title}>
        {Object.values(input)}
      </GroupTag>
    );
  });
}
