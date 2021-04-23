import React, { useEffect, useRef } from 'react';
import DefaultOption from './Search/Option';
import usePopup from '../../helpers/usePopup';
import PropTypes from 'prop-types';
import compareObjects from '../../helpers/compareObjects';

function Suggestions({
  allowScroll,
  showNumber,
  Input,
  name,
  valueOptions,
  setCurrentLabel,
  onChange,
  currentValue,
  loading,
  placeholder,
  currentLabel,
  render,
  onBlur,
}) {
  const input = useRef({});

  let [listShown, showList, preventShowPopup] = usePopup(false, [
    input.current,
  ]);

  const numberHiddenOption = allowScroll ||
    !valueOptions ||
    valueOptions.length <= showNumber || (
      <div className='option disabled' value=''>
        {valueOptions.length - 10} more
      </div>
    );

  const Option = render.Option || DefaultOption;

  function renderOption(valueOption) {
    let isActive;
    if (currentValue === valueOption.value && !isActive) {
      isActive = true;
    } else {
      isActive = false;
    }
    return (
      <Option
        name={name}
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

  useEffect(() => {
    console.log(valueOptions);
  }, [valueOptions]);
  console.log(valueOptions);
  return (
    <div
      className={`form-select${!currentValue ? ' placeholdered' : ''}`}
      name={name}
    >
      <Input
        ref={input}
        listShown={listShown}
        showList={showList}
        preventShowPopup={preventShowPopup}
        placeholder={placeholder}
        currentLabel={currentLabel}
        preventShowPopup={preventShowPopup}
        showList={showList}
        setCurrentLabel={setCurrentLabel}
        render={render}
        onBlur={onBlur}
        listShow={listShown}
      />

      {listShown && (
        <div className={`select-list${allowScroll ? ' scroll' : ''}`}>
          {loading ? (
            <div className='option disabled' value=''>
              {render.Loader ? render.Loader(14) : 'Loading...'}
            </div>
          ) : (
            (allowScroll
              ? valueOptions
              : valueOptions.slice(0, showNumber)
            ).map((value) => renderOption(value))
          )}
          {numberHiddenOption}
        </div>
      )}
    </div>
  );
}

Suggestions.propTypes = {};

export default Suggestions;
