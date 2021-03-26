import React from 'react';

export default function LabeledInput(render, label, id, input) {
  const Label = render.Label || 'label';

  return label ? (
    <div className='form-group'>
      <Label className='form-label' htmlFor={id}>
        {label}
      </Label>
      {input}
    </div>
  ) : (
    input
  );
}
