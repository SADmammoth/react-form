import React, { useEffect, useMemo, useState } from 'react';

import { isEqual } from 'lodash-es';

import Field from './Field';
import FilterOptions from './FilterOptions';
import createEvent from '@/formHelpers/createEvent';
import useValueOptions from '@/formHelpers/getValueOptions';
import Suggestions from '@/generic/Suggestions';
// import PropTypes from 'prop-types';
import compareObjects from '@/helpers/compareObjects';

function Search({
  // type,
  name,
  onChange,
  // onInput,
  value: currentValue,
  valueOptions: options,
  placeholder,
  render,
  required,
  allowScroll,
}) {
  const [valueOptions, loading] = useValueOptions(options);
  const [currentLabel, setCurrentLabel] = useState(null);

  const filteredValueOptions = useMemo(
    () => FilterOptions(currentLabel, valueOptions),
    [currentLabel, valueOptions],
  );

  useEffect(() => {
    setCurrentLabel(
      valueOptions?.find(({ value }) => value === currentValue)?.label,
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
        filteredValueOptions.find(({ value }) => isEqual(value, currentValue))
          .label,
      );
    }
    if (!currentLabel && currentValue) {
      setCurrentLabel('');
      onChange(createEvent(name, ''));
    }
  };

  return (
    <Suggestions
      filteredValueOptions={filteredValueOptions}
      showNumber={showNumber}
      Input={Field}
      name={name}
      setCurrentLabel={setCurrentLabel}
      onChange={onChange}
      currentValue={currentValue}
      allowScroll={allowScroll}
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