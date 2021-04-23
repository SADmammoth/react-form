import React, { useEffect, useMemo, useRef, useState } from 'react';

import Input from './Input';

import createEvent from '../../../helpers/createEvent';
import useValueOptions from '../../../helpers/getValueOptions';
import PropTypes from 'prop-types';
import compareObjects from '../../../helpers/compareObjects';
import FilterOptions from './FilterOptions';
import Suggestions from '../Suggestions';

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
  let [valueOptions, loading] = useValueOptions(options);
  let [currentLabel, setCurrentLabel] = useState(null);

  const filteredValueOptions = useMemo(() => {
    console.log(currentLabel);
    return FilterOptions(currentLabel, valueOptions);
  }, [currentLabel, valueOptions]);

  useEffect(() => {
    setCurrentLabel(
      valueOptions?.find(({ value }) => value === currentValue)?.label
    );
  }, [currentValue, valueOptions]);

  const showNumber = 10;

  const onBlur = () => {
    if (currentLabel && filteredValueOptions && filteredValueOptions.length) {
      setCurrentLabel(filteredValueOptions[0].label);
      onChange(createEvent(name, filteredValueOptions[0].value));
    }
    if (!currentLabel && currentValue && required) {
      setCurrentLabel(
        filteredValueOptions.find(({ value }) => value === currentValue).label
      );
    }
    if (!currentLabel && currentValue) {
      setCurrentLabel('');
      onChange(createEvent(name, ''));
    }
  };

  return (
    <Suggestions
      valueOptions={filteredValueOptions}
      showNumber={showNumber}
      Input={Input}
      name={name}
      setCurrentLabel={setCurrentLabel}
      onChange={onChange}
      currentValue={currentValue}
      allowScroll={allowScroll}
      showNumber={showNumber}
      loading={loading}
      placeholder={placeholder}
      currentLabel={currentLabel}
      render={render}
      onBlur={onBlur}
    />
  );
}

Search.propTypes = {};

export default React.memo(Search, compareObjects);
