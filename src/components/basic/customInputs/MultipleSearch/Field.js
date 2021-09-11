/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';

import createEvent from '@/formHelpers/createEvent';
import DefaultTag from '@/generic/Tag';

export default function Field({
  classes,
  name,
  placeholder,
  currentLabel,
  showList,
  listShown,
  setCurrentLabel,
  render,
  onChange,
  currentValue,
  valueOptions,
}) {
  const InputTag = render.Input || 'input';
  const Tag = render.Tag || DefaultTag;

  const mapCurrentValue = useCallback(
    (value) => {
      const valueOption = valueOptions.find(
        ({ value: candidateValue }) => candidateValue === value,
      );
      if (!valueOption) return null;

      return (
        <Tag
          render={render}
          onDelete={() => {
            onChange(createEvent(name, valueOption.label));
          }}>
          {valueOption.label}
        </Tag>
      );
    },
    [valueOptions, currentValue],
  );

  return (
    <div className={classes.header}>
      {currentValue && currentValue.length
        ? currentValue.map(mapCurrentValue)
        : null}
      <InputTag
        type="text"
        className={classes.input}
        placeholder={placeholder || 'Start typing to see options...'}
        value={currentLabel || ''}
        aria-disabled={!currentLabel ? 'disabled' : null}
        onInput={(event) => {
          setCurrentLabel(event.target.value);
        }}
        onFocus={() => {
          showList(true);
        }}
      />
    </div>
  );
}
