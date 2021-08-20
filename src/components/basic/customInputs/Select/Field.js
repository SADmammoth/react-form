/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

export default function Field({
  placeholder,
  currentLabel,
  showList,
  listShown,
  render,
}) {
  const InputTag = render.Input || 'input';

  return (
    <div
      className="select-header"
      onClick={() => {
        showList(!listShown);
      }}>
      <InputTag
        className={`select-label ${currentLabel ? '' : 'disabled'}`}
        type="text"
        placeholder={placeholder || 'Choose option...'}
        value={currentLabel || ''}
        aria-disabled={!currentLabel ? 'disabled' : null}
        disabled
      />
      <input
        type="checkbox"
        className="form-spoiler"
        name="select-header-button"
        checked={listShown}
        onChange={() => {
          showList(!listShown);
        }}
        style={{ fontSize: '10px', marginBottom: '0px' }}
      />
    </div>
  );
}
