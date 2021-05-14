import React, { useEffect, useState } from 'react';

import { includes, isEqual } from 'lodash-es';
import PropTypes from 'prop-types';

import compareObjects from '../../../helpers/compareObjects';
import createEvent from '../../../helpers/createEvent';
import useValueOptions from '../../../helpers/getValueOptions';
import Suggestions from '../Suggestions';
import Input from './Input';

function MultipleSelect(props) {
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
      filteredValueOptions={valueOptions}
      showNumber={showNumber}
      Input={Input}
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
    />
  );
}

MultipleSelect.defaultProps = {
  // required: false,
  value: [],
  placeholder: null,
};

MultipleSelect.propTypes = {
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

export default React.memo(MultipleSelect, compareObjects);
