import React from 'react';
import mapGroups from './mapGroups';

export default function useRenderGroups(inputs, inputsProps) {
  if (!inputs) return inputs;
  const mapped = mapGroups(inputs, inputsProps);
  return Object.entries(mapped).map(([name, inputData]) => {
    if (React.isValidElement(inputData) || !inputData) {
      return inputData;
    } else {
      const { $title, ...input } = inputData;
      return (
        <div key={'group-' + name} className='group'>
          <p className='group-title'>{$title}</p>
          {Object.values(input)}
        </div>
      );
    }
  });
}
