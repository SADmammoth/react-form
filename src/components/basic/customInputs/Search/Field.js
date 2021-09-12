import React from 'react';

import renderTag from '@/formHelpers/renderTag';

export default function Field({
  classes,
  placeholder,
  currentLabel,
  showList,
  setCurrentLabel,
  render,
  onBlur,
}) {
  const Input = renderTag(render, 'Input');

  return (
    <Input
      type="text"
      className={classes.input}
      placeholder={placeholder || 'Start typing to see options...'}
      value={currentLabel || ''}
      aria-disabled={!currentLabel ? 'disabled' : null}
      onChange={(event) => {
        setCurrentLabel(event.target.value);
      }}
      onFocus={() => {
        showList(true);
      }}
      onBlur={onBlur}
    />
  );
}
