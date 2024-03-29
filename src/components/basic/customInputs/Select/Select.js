import React, { useEffect, useState } from 'react';
import { isEqual } from 'lodash-es';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Suggestions from '@/generic/Suggestions';
import compareObjects from '@/genericHelpers/compareObjects';
import useValueOptions from '@/hooks/useValueOptions';
import theme from '@/styles/theme';
import Field from './Field';
import styles from './Select.styles';

const useStyles = createUseStyles(styles);

function Select(props) {
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

  const [valueOptions, loading] = useValueOptions(options);

  const [currentLabel, setCurrentLabel] = useState(null);

  useEffect(() => {
    setCurrentLabel(
      valueOptions?.find(({ value }) => isEqual(value, currentValue))?.label,
    );
  }, [currentValue, valueOptions]);

  const showNumber = 10;

  return (
    <Suggestions
      className={className}
      inputClasses={classes}
      filteredValueOptions={valueOptions}
      showNumber={showNumber}
      Input={Field}
      name={name}
      valueOptions={valueOptions}
      setCurrentLabel={setCurrentLabel}
      onChange={onChange}
      currentValue={currentValue}
      allowScroll
      loading={loading}
      placeholder={placeholder}
      currentLabel={currentLabel}
      render={render}
      disabled={disabled}
    />
  );
}

Select.defaultProps = {
  className: '',
  // required: false,
  value: '',
  placeholder: null,
};

Select.propTypes = {
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

export default React.memo(Select, compareObjects);
