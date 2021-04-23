import React from 'react';

export default function Input({
  placeholder,
  currentLabel,
  preventShowPopup,
  showList,
  setCurrentLabel,
  render,
  onBlur,
}) {
  const InputTag = render.Input || 'input';
  return (
    <div className='input-wrapper'>
      <InputTag
        type='text'
        className='search-input'
        placeholder={placeholder || 'Start typing to see options...'}
        value={currentLabel || ''}
        aria-disabled={!currentLabel ? 'disabled' : null}
        onChange={(event) => {
          setCurrentLabel(event.target.value);
        }}
        onFocus={(event) => {
          showList(true);
          preventShowPopup();
        }}
        onBlur={onBlur}
      />
    </div>
  );
}
