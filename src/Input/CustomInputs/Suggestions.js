import React, { useEffect, useRef, useState } from 'react';
import DefaultOption from './Search/Option';
import usePopup from '../../helpers/usePopup';
import PropTypes from 'prop-types';
import compareObjects from '../../helpers/compareObjects';

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

  let [listShown, showList] = useState(false);

  const numberHiddenOption = allowScroll ||
    !filteredValueOptions ||
    filteredValueOptions.length <= showNumber || (
      <div className='option disabled' value=''>
        {filteredValueOptions.length - 10} more
      </div>
    );

  const Option = render.Option || DefaultOption;

  function renderOption(valueOption) {
    let isActive;
    if (
      (_.isEqual(currentValue, valueOption.value) ||
        _.includes(currentValue, valueOption.value)) &&
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
        onClick={(event) => {
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
      name={name}
    >
      <Input
        name={name}
        ref={input}
        listShown={listShown}
        showList={showList}
        placeholder={placeholder}
        currentLabel={currentLabel}
        showList={showList}
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
      {listShown ? (
        <div
          className='popup-backdrop'
          onClick={() => {
            showList(false);
          }}
        ></div>
      ) : null}
    </div>
  );
}

Suggestions.propTypes = {};

export default Suggestions;
