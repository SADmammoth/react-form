import React, { useEffect, useMemo, useState } from 'react';

import { includes, isEqual } from 'lodash-es';
import { createUseStyles } from 'react-jss';

import Field from './Field';
import createEvent from '@/formHelpers/createEvent';
import filterSearchOptions from '@/formHelpers/filterSearchOptions';
import Suggestions from '@/generic/Suggestions';
import compareObjects from '@/helpers/compareObjects';
import useFetchedProps from '@/hooks/useFetchedProps';
import theme from '@/styles/theme';

import styles from './SearchMultiple.styles';

const useStyles = createUseStyles(styles);

function SearchMultiple({
  className,
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
  disabled,
}) {
  const classes = useStyles(theme);

  const [valueOptions, loading] = useFetchedProps(options);
  const [currentLabel, setCurrentLabel] = useState(null);

  const filteredValueOptions = useMemo(
    () => filterSearchOptions(currentLabel, valueOptions),
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
      className={className}
      inputClasses={classes}
      filteredValueOptions={filteredValueOptions}
      valueOptions={valueOptions || []}
      showNumber={showNumber}
      Input={Field}
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
      disabled={disabled}
    />
  );
}

SearchMultiple.propTypes = {};

export default React.memo(SearchMultiple, compareObjects);
