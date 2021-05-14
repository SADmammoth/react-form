/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import DefaultTag from '../../../Components/Tag';
import createEvent from '../../../helpers/createEvent';

export default function Input({
  name,
  placeholder,
  currentLabel,
  showList,
  listShown,
  setCurrentLabel,
  render,
  onChange,
}) {
  const InputTag = render.Input || 'input';
  const Tag = render.Tag || DefaultTag;

  return (
    <div className="select-header">
      <div className="tag-stack">
        {currentLabel && currentLabel.length ? (
          currentLabel.map((label) => (
            <Tag
              onDelete={() => {
                onChange(createEvent(name, label));
                setCurrentLabel(label);
              }}>
              {label}
            </Tag>
          ))
        ) : (
          <div
            className="select-placeholder"
            onClick={() => {
              showList(!listShown);
            }}>
            {placeholder || 'Choose option...'}
          </div>
        )}
        <InputTag
          className={`select-label ${currentLabel ? '' : 'disabled'}`}
          type="hidden"
          placeholder={placeholder || 'Choose option...'}
          value={currentLabel || ''}
          aria-disabled={!currentLabel ? 'disabled' : null}
          disabled
        />
      </div>
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
