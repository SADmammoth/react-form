import React from 'react';

export default function Field({
  placeholder,
  currentLabel,
  showList,
  setCurrentLabel,
  render,
  onBlur,
}) {
  const FieldTag = render.Field || 'field';
  return (
    <div className="field-wrapper">
      <FieldTag
        type="text"
        className="search-field"
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
    </div>
  );
}
