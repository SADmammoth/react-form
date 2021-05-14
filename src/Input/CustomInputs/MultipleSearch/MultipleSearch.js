import React, { useEffect, useMemo, useState } from 'react';

import { includes, isEqual } from 'lodash-es';

import compareObjects from '../../../helpers/compareObjects';
import createEvent from '../../../helpers/createEvent';
import useValueOptions from '../../../helpers/getValueOptions';
import Suggestions from '../Suggestions';
import FilterOptions from './FilterOptions';
import Input from './Input';

function MultipleSearch({
  // type,
  name,
  onChange,
  // onInput,
  value: currentValue,
  valueOptions: options,
  placeholder,
  render,
  // required,
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

  const onBlur = () => {};

  const onChangeHandler = ({ target: { value } }) => {
    const label = valueOptions.find(
      (candidate) =>
        candidate ===
        valueOptions.find(({ label: optionLabel }) => optionLabel === value),
    );
    if (label) {
      value = label.value;
    }

    if (includes(currentValue, value)) {
      onChange(
        createEvent(
          name,
          currentValue.filter((candidate) => !isEqual(candidate, value)),
        ),
      );
      return;
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
