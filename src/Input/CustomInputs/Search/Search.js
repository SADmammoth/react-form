import React, { useEffect, useMemo, useRef, useState } from 'react';

import createEvent from '../../../helpers/createEvent';

import DefaultOption from './Option';
import useValueOptions from '../../../helpers/getValueOptions';
import usePopup from '../../../helpers/usePopup';
import PropTypes from 'prop-types';
import compareObjects from '../../../helpers/compareObjects';
import FilterOptions from './FilterOptions';

function Search({
  type,
  name,
  onChange,
  onInput,
  value: currentValue,
  valueOptions: options,
  placeholder,
  render,
  required,
  allowScroll,
}) {
  const Input = render.Input || 'input';
  const Option = render.Option || DefaultOption;

  let [valueOptions, loading] = useValueOptions(options);
  let [currentLabel, setCurrentLabel] = useState(null);

  function renderOption(valueOption) {
    let isActive;
    if (currentValue === valueOption.value && !isActive) {
      isActive = true;
    } else {
      isActive = false;
    }
    return (
      <Option
        key={name + valueOption.value}
        onClick={() => {
          showList(false);
          setCurrentLabel(valueOption.label);
          onChange({ target: { name, value: valueOption.value } });
        }}
        active={isActive}
        {...valueOption}
      />
    );
  }

  const input = useRef({});

  let [listShown, showList] = usePopup(false, [input.current]);

  const filteredValueOptions = useMemo(() => {
    return FilterOptions(currentLabel, valueOptions);
  }, [currentLabel, valueOptions]);

  useEffect(() => {
    setCurrentLabel(
      filteredValueOptions?.find(({ value }) => value === currentValue)?.label
    );
  }, [currentValue, valueOptions]);

  const showNumber = 10;

  const numberHiddenOption = allowScroll ||
    !filteredValueOptions ||
    filteredValueOptions.length <= showNumber || (
      <div className='option disabled' value=''>
        {filteredValueOptions.length - 10} more
      </div>
    );

  return (
    <div
      className={`form-select${!currentValue ? ' placeholdered' : ''}`}
      name={name}
    >
      <input
        ref={input}
        type='text'
        className='search-input'
        placeholder={placeholder || 'Start typing to see options...'}
        value={currentLabel || ''}
        aria-disabled={!currentLabel ? 'disabled' : null}
        onChange={(event) => {
          setCurrentLabel(event.target.value);
        }}
        onFocus={() => {
          showList(true);
        }}
        onBlur={() => {
          if (
            currentLabel &&
            filteredValueOptions &&
            filteredValueOptions.length
          ) {
            setCurrentLabel(filteredValueOptions[0].label);
            onChange(createEvent(name, filteredValueOptions[0].value));
          }
          if (!currentLabel && currentValue && required) {
            setCurrentLabel(
              filteredValueOptions.find(({ value }) => value === currentValue)
                .label
            );
          }
          if (!currentLabel && currentValue) {
            setCurrentLabel('');
            onChange(createEvent(name, ''));
          }
        }}
      />
      {listShown && (
        <div className={`select-list${allowScroll ? ' scroll' : ''}`}>
          {loading ? (
            <div className='option disabled' value=''>
              {render.Loader ? render.Loader(14) : 'Loading...'}
            </div>
          ) : (
            (allowScroll
              ? filteredValueOptions
              : filteredValueOptions.slice(0, showNumber)
            ).map((value) => renderOption(value))
          )}
          {numberHiddenOption}
        </div>
      )}
    </div>
  );
}

Search.propTypes = {};

export default React.memo(Search, compareObjects);
