import React from 'react';

import capitalize from '../capitalize';

export default function renderInput(inputs) {
  const renderGroup = ([key, item]) => {
    if (!React.isValidElement(item)) {
      return (
        <div className="group">
          <p className="group-title">{capitalize(key)}</p>
          {Object.entries(item).map(renderGroup)}
        </div>
      );
    }
    return item;
  };

  return !inputs || Object.entries(inputs).map(renderGroup);
}
