import React from 'react';

export default function LabeledInput(render, label, id, input) {
  const defaultLabel = (props) => <label {...props} />;
  const Label = render.label || defaultLabel;

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
