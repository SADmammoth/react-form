import React, { useEffect, useState } from 'react';

import { isEqual } from 'lodash-es';
import PropTypes from 'prop-types';

import Field from './Field';
import useValueOptions from '@/formHelpers/getValueOptions';
import Suggestions from '@/generic/Suggestions';
import compareObjects from '@/helpers/compareObjects';

function Select(props) {
  const {
    // type,
    valueOptions: options,
    name,
    value: currentValue,
    placeholder,
    onChange,
    // required,
    render,
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
    />
  );
}

Select.defaultProps = {
  // required: false,
  value: '',
  placeholder: null,
};

Select.propTypes = {
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
