import React, { useEffect, useState } from 'react';

import { includes, isEqual } from 'lodash-es';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Field from './Field';
import createEvent from '@/formHelpers/createEvent';
import Suggestions from '@/generic/Suggestions';
import compareObjects from '@/helpers/compareObjects';
import useFetchedProps from '@/hooks/useFetchedProps';
import theme from '@/styles/theme';

import styles from './SelectMultiple.styles';

const useStyles = createUseStyles(styles);

function SelectMultiple(props) {
  const classes = useStyles(theme);

  const {
    className,
    // type,
    valueOptions: options,
    name,
    value: currentValue,
    placeholder,
    onChange,
    // required,
    render,
    disabled,
  } = props;

  const [valueOptions, loading] = useFetchedProps(options);

  const [currentLabel, setCurrentLabel] = useState([]);

  useEffect(() => {
    setCurrentLabel(
      valueOptions
        ?.filter(({ value }) => includes(currentValue, value))
        .map(({ label }) => label),
    );
  }, [currentValue, valueOptions]);

  const showNumber = 10;

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

  const addValue = (value) => {
    setCurrentLabel((current) => {
      if (includes(current, value)) {
        return current.filter((candidate) => isEqual(candidate, value));
      }
      return [...current, value];
    });
  };

  return (
    <Suggestions
      className={className}
      inputClasses={classes}
      filteredValueOptions={valueOptions}
      showNumber={showNumber}
      Input={Field}
      name={name}
      valueOptions={valueOptions}
      setCurrentLabel={addValue}
      onChange={onChangeHandler}
      currentValue={currentValue}
      allowScroll
      loading={loading}
      placeholder={placeholder}
      currentLabel={currentLabel}
      render={render}
      hideListOnChoice={false}
      disabled={disabled}
    />
  );
}

SelectMultiple.defaultProps = {
  className: '',
  // required: false,
  value: [],
  placeholder: null,
};

SelectMultiple.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  // required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  valueOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    PropTypes.func,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  render: PropTypes.shape({
    Label: PropTypes.any,
    Input: PropTypes.any,
    Loader: PropTypes.func,
  }),
};

export default React.memo(SelectMultiple, compareObjects);
