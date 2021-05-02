import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import useValueOptions from '../../../helpers/getValueOptions';
import FilterOptions from '../MultipleSearch/FilterOptions';
import Suggestions from '../Suggestions';
import Input from '../MultipleSearch/Input';
import createEvent from '../../../helpers/createEvent';

function MultipleSearch({
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
    return FilterOptions(currentLabel, valueOptions);
  }, [currentLabel, valueOptions]);

  useEffect(() => {
    setCurrentLabel(
      valueOptions?.find(({ value }) => value === currentValue)?.label
    );
  }, [currentValue, valueOptions]);

  const showNumber = 10;

  const onBlur = () => {};

  const onChangeHandler = ({ target: { name, value } }) => {
    console.log(value);
    const label = valueOptions.find((candidate) => {
      return candidate === valueOptions.find(({ label }) => label === value);
    });
    if (label) {
      value = label.value;
    }
    console.log(value);

    if (_.includes(currentValue, value)) {
      return onChange(
        createEvent(
          name,
          currentValue.filter((candidate) => !_.isEqual(candidate, value))
        )
      );
    }
    onChange(createEvent(name, [...currentValue, value]));
  };

  return (
    <Suggestions
      filteredValueOptions={filteredValueOptions}
      valueOptions={valueOptions}
      showNumber={showNumber}
      Input={Input}
      name={name}
      setCurrentLabel={setCurrentLabel}
      onChange={onChangeHandler}
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

MultipleSearch.propTypes = {};

export default React.memo(MultipleSearch, compareObjects);
