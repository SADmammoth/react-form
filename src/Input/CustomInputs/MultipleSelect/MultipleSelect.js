import React, { useEffect, useState } from 'react';
import Input from './Input';
import _ from 'lodash';
import PropTypes from 'prop-types';
import createEvent from '../../../helpers/createEvent';
import Suggestions from '../Suggestions';
import useValueOptions from '../../../helpers/getValueOptions';

function MultipleSelect(props) {
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

  let [currentLabel, setCurrentLabel] = useState([]);
  useEffect(() => {
    setCurrentLabel(
      valueOptions
        ?.filter(({ value }) => _.includes(currentValue, value))
        .map(({ label }) => label)
    );
  }, [currentValue, valueOptions]);

  const showNumber = 10;

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

  const addValue = (value) => {
    setCurrentLabel((current) => {
      if (_.includes(current, value)) {
        return current.filter((candidate) => _.isEqual(candidate, value));
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
      allowScroll={true}
      showNumber={showNumber}
      loading={loading}
      placeholder={placeholder}
      currentLabel={currentLabel}
      render={render}
      hideListOnChoice={false}
    />
  );
}

MultipleSelect.defaultProps = {
  required: false,
  value: [],
  placeholder: null,
};

MultipleSelect.propTypes = {
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

export default React.memo(MultipleSelect, compareObjects);
