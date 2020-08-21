import React, { useEffect, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../../../helpers/compareObjects';
import SliderThumb from '../SliderThumb';
import useIndex from '../../../../helpers/useIndex';
import useSliderPart from '../../../../helpers/formHelpers/useSliderPart';
import calcPercent from '../../../../helpers/formHelpers/calcPercent';

function Slider(props) {
  const {
    name,
    type,
    value: currentValue,
    onChange,
    required,
    valueOptions,
    alwaysShowTip,
  } = props;

  let value = currentValue || valueOptions[0].value;

  let currentIndex = valueOptions.findIndex((el) => el.value === value);
  currentIndex = currentIndex < 0 ? 0 : currentIndex;

  let length = valueOptions.length;

  let [index, setIndex] = useIndex(currentIndex, length);
  let [slider, part] = useSliderPart(length);

  let onChangeHandler = (index) => {
    if (index >= 0 && index <= length - 1)
      onChange({
        target: { name, value: valueOptions[index].value },
      });
  };

  let prev = () => {
    if (index > 0) {
      onChangeHandler(index - 1);
    }
  };

  let next = () => {
    if (index < valueOptions.length - 1) {
      onChangeHandler(index + 1);
    }
  };

  let moveTo = (event) => {
    let { left, width } = slider.current.getBoundingClientRect();
    let newIndex = parseInt(
      ((event.clientX - left) / width) * valueOptions.length
    );
    onChangeHandler(newIndex);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div
      className="form-slider"
      style={{
        '--percent': calcPercent(index, length),
        '--display-tip': alwaysShowTip ? 'unset' : 'none',
      }}
    >
      <button
        type="button"
        name={name}
        className="form-slider-prev"
        onClick={prev}
      >
        -
      </button>

      <div ref={slider} className="form-slider-bg" onClick={moveTo}>
        <input
          type="text"
          name={name}
          value={valueOptions[index].value}
          required={required}
          readOnly
        ></input>

        <SliderThumb
          sliderPart={part}
          prev={() => {
            setIndex(index - 1);
          }}
          next={() => {
            setIndex(index + 1);
          }}
          onMoveEnd={() => onChangeHandler(index)}
        />
      </div>

      <button
        type="button"
        name={name}
        className="form-slider-next"
        onClick={next}
      >
        +
      </button>
    </div>
  );
}

Slider.defaultProps = {
  required: false,
  value: null,
  placeholder: null,
  attributes: {
    step: 1,
    min: 0,
    max: 999,
  },
};

Slider.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  valueOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  ]).isRequired,
  alwaysShowTip: PropTypes.bool,
};

export default React.memo(Slider, compareObjects);
