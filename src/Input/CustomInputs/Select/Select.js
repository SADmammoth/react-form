import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import compareObjects from '../../../helpers/compareObjects';
import useValueOptions from '../../../helpers/getValueOptions';
import Input from './Input';
import Suggestions from '../Suggestions';

function Select(props) {
  const {
    valueOptions: options,
    name,
    value: currentValue,
    placeholder,
    onChange,
    required,
    render,
    type,
  } = props;

  let [valueOptions, loading] = useValueOptions(options);

  let [currentLabel, setCurrentLabel] = useState(null);
  useEffect(() => {
    setCurrentLabel(
      valueOptions?.find(({ value }) => _.isEqual(value, currentValue))?.label
    );
  }, [currentValue, valueOptions]);

  const showNumber = 10;

  return (
    <Suggestions
      filteredValueOptions={valueOptions}
      showNumber={showNumber}
      Input={Input}
      name={name}
      valueOptions={valueOptions}
      setCurrentLabel={setCurrentLabel}
      onChange={onChange}
      currentValue={currentValue}
      allowScroll={true}
      showNumber={showNumber}
      loading={loading}
      placeholder={placeholder}
      currentLabel={currentLabel}
      render={render}
    />
  );
}

Select.defaultProps = {
  required: false,
  value: '',
  placeholder: null,
};

Select.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  valueOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
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
