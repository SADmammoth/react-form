import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../../helpers/compareObjects';
import useValueOptions from '../../../helpers/getValueOptions';

function Select(props) {
  const {
    valueOptions: options,
    name,
    value: currentValue,
    placeholder,
    onChange,
    required,
  } = props;

  let [valueOptions, loading] = useValueOptions(options);

  function renderOption(valueOption) {
    return (
      <option key={name + valueOption.value} value={valueOption.value}>
        {valueOption.label}
      </option>
    );
  }

  useEffect(() => {
    if (valueOptions && valueOptions.length === 1 && !placeholder) {
      onChange({ target: { name, value: valueOptions[0].value } });
    }
  }, [valueOptions, placeholder]);
  console.log(currentValue);
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
      className={`form-select${!currentValue ? ' placeholdered' : ''}`}
      name={name}
      value={currentValue}
      onChange={onChange}
      required={required && 'required'}
    >
      {placeholder && (
        <option disabled value="">
          {placeholder}
        </option>
      )}
      {loading ? (
        <option disabled value="">
          loading...
        </option>
      ) : (
        valueOptions.map((value) => renderOption(value))
      )}
    </select>
  );
}

Select.defaultProps = {
  required: false,
  value: null,
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
};

export default React.memo(Select, compareObjects);
