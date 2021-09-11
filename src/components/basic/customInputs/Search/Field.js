import React from 'react';

export default function Field({
  classes,
  placeholder,
  currentLabel,
  showList,
  setCurrentLabel,
  render,
  onBlur,
}) {
  const InputTag = render.Input || 'input';

  return (
    <InputTag
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
