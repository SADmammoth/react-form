import React, { useEffect, useMemo, useState } from 'react';

import { isEqual } from 'lodash-es';
import { useTheme, createUseStyles } from 'react-jss';

import Field from './Field';
import createEvent from '@/formHelpers/createEvent';
import filterSearchOptions from '@/formHelpers/filterSearchOptions';
import useValueOptions from '@/formHelpers/getValueOptions';
import Suggestions from '@/generic/Suggestions';
// import PropTypes from 'prop-types';
import compareObjects from '@/helpers/compareObjects';
import theme from '@/styles/theme';

import styles from './Search.styles';

const useStyles = createUseStyles(styles);

function Search({
  className,
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
  const classes = useStyles(theme);

  const [valueOptions, loading] = useValueOptions(options);
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
      className={className}
      inputClasses={classes}
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
