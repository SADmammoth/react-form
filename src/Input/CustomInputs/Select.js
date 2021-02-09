import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../helpers/compareObjects';
import useValueOptions from '../../helpers/getValueOptions';
import Spinner from '../../Spinner';
import usePopup from '../../helpers/usePopup';

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

  let [currentLabel, setCurrentLabel] = useState(null);

  function renderOption(valueOption) {
    let isActive;
    if (currentValue === valueOption.value && !isActive) {
      isActive = true;
    } else {
      isActive = false;
    }
    return (
      <div
        className={`option${isActive ? ' active' : ''}`}
        key={name + valueOption.value}
        onClick={() => {
          showList(false);
          setCurrentLabel(valueOption.label);
          onChange({ target: { name, value: valueOption.value } });
        }}
      >
        {valueOption.label}
      </div>
    );
  }

  let [listShown, showList] = usePopup(false);

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div
      className={`form-select${!currentValue ? ' placeholdered' : ''}`}
      name={name}
    >
      <div
        className="select-header"
        onClick={() => {
          showList(!listShown);
        }}
      >
        {currentLabel || placeholder || 'Choose option...'}
        <input
          type="checkbox"
          className="form-spoiler"
          name="select-header-button"
          checked={listShown}
          onChange={() => {
            showList(!listShown);
          }}
          style={{ fontSize: '10px', marginBottom: '0px' }}
        />
      </div>
      {listShown && (
        <div className="select-list">
          {loading ? (
            <div className="option disabled" value="">
              <Spinner size={14} />
              <span>loading...</span>
            </div>
          ) : (
            valueOptions.map((value) => renderOption(value))
          )}
        </div>
      )}
    </div>
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
