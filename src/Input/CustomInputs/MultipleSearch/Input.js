import React, { useCallback } from 'react';
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
  onBlur,
  onChange,
  currentValue,
  valueOptions,
}) {
  const InputTag = render.Input || 'input';
  const Tag = render.Tag || DefaultTag;

  const mapCurrentValue = useCallback(
    (value) => {
      const valueOption = valueOptions.find(
        ({ value: candidateValue }) => candidateValue === value
      );
      if (!valueOption) return;
      return (
        <Tag
          onDelete={() => {
            onChange(createEvent(name, label));
          }}
        >
          {valueOption.label}
        </Tag>
      );
    },
    [valueOptions, currentValue]
  );

  return (
    <div className='select-header'>
      <div className='input-wrapper'>
        <InputTag
          type='text'
          className='search-input'
          placeholder={placeholder || 'Start typing to see options...'}
          value={currentLabel || ''}
          aria-disabled={!currentLabel ? 'disabled' : null}
          onInput={(event) => {
            setCurrentLabel(event.target.value);
          }}
          onFocus={(event) => {
            showList(true);
          }}
        />
      </div>
      <div className='tag-stack'>
        {currentValue && currentValue.length ? (
          currentValue.map(mapCurrentValue)
        ) : (
          <div
            className='select-placeholder'
            onClick={() => {
              showList(!listShown);
            }}
          >
            {placeholder || 'Choose option...'}
          </div>
        )}
      </div>
      <input
        type='checkbox'
        className='form-spoiler'
        name='select-header-button'
        checked={listShown}
        onChange={() => {
          showList(!listShown);
        }}
        style={{ fontSize: '10px', marginBottom: '0px' }}
      />
    </div>
  );
}
