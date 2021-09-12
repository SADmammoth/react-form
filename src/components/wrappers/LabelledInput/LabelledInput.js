import React from 'react';

import renderTag from '@/formHelpers/renderTag';

export default function LabelledInput(render, label, id, input) {
  // eslint-disable-next-line react/destructuring-assignment
  const Label = renderTag(render, 'Label');

  return label ? (
    <div className="form-group">
      <Label className="form-label" htmlFor={id}>
        {label}
      </Label>
      {input}
    </div>
  ) : (
    input
  );
}
