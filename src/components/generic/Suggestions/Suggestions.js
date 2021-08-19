/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react';

import { includes, isEqual } from 'lodash-es';

// import PropTypes from 'prop-types';
import SearchOption from '../SearchOption';

function Suggestions({
  allowScroll,
  showNumber,
  Input,
  name,
  filteredValueOptions,
  valueOptions,
  setCurrentLabel,
  onChange,
  currentValue,
  loading,
  placeholder,
  currentLabel,
  render,
  onBlur,
  hideListOnChoice = true,
}) {
  const input = useRef({});

  const [listShown, showList] = useState(false);

  const numberHiddenOption = allowScroll ||
    !filteredValueOptions ||
    filteredValueOptions.length <= showNumber || (
      <div className="option disabled" value="">
        {`${filteredValueOptions.length - 10} more`}
      </div>
    );

  const Option = render.Option || SearchOption;

  function renderOption(valueOption) {
    let isActive;
    if (
      (isEqual(currentValue, valueOption.value) ||
        includes(currentValue, valueOption.value)) &&
      !isActive
    ) {
      isActive = true;
    } else {
      isActive = false;
    }
    return (
      <Option
        name={name}
        key={name + valueOption.value}
        onClick={() => {
          setCurrentLabel(valueOption.label);
          onChange({ target: { name, value: valueOption.value } });
          if (hideListOnChoice) {
            showList(false);
          } else {
            showList(true);
          }
        }}
        active={isActive}
        {...valueOption}
      />
    );
  }

  return (
    <div
      className={`form-select${!currentValue ? ' placeholdered' : ''}`}
      name={name}>
      <Input
        name={name}
        ref={input}
        listShown={listShown}
        showList={showList}
        placeholder={placeholder}
        currentLabel={currentLabel}
        setCurrentLabel={setCurrentLabel}
        render={render}
        onBlur={onBlur}
        listShow={listShown}
        onChange={onChange}
        currentValue={currentValue}
        valueOptions={valueOptions}
      />

      {listShown && (
        <div className={`select-list${allowScroll ? ' scroll' : ''}`}>
          {loading ? (
            <div className="option disabled" value="">
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
      {listShown ? (
        <div
          className="popup-backdrop"
          onClick={() => {
            showList(false);
          }}
        />
      ) : null}
    </div>
  );
}

Suggestions.propTypes = {};

export default Suggestions;
