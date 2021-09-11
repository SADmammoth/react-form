import React from 'react';

export default function LabelledInput(render, label, id, input) {
  // eslint-disable-next-line react/destructuring-assignment
  const Label = render.Label || 'label';

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