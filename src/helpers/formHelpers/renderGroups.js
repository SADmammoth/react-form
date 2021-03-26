import React from 'react';
import Group from '../../Form/Group';
import mapGroups from './mapGroups';

export default function renderGroups(inputs, inputsProps, groupTag) {
  if (!inputs) return inputs;
  const mapped = mapGroups(inputs, inputsProps);
  return Object.entries(mapped).map(([name, inputData]) => {
    if (React.isValidElement(inputData) || !inputData) {
      return inputData;
    } else {
      const { $title, ...input } = inputData;
      const GroupTag = groupTag || Group;
      return (
        <GroupTag key={'group-' + name} name={name} title={$title}>
          {Object.values(input)}
        </GroupTag>
      );
    }
  });
}
