import React from 'react';
import FieldGroup from '@/generic/FieldGroup';
import mapGroups from './mapGroups';

export default function renderGroups(
  inputs,
  values,
  additionalFields,
  groupTag,
) {
  if (!inputs) return inputs;
  const mapped = mapGroups(inputs, values, additionalFields);

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
