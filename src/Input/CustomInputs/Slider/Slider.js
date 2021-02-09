import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../../helpers/compareObjects';
import SliderThumb from '../SliderThumb';
import useIndex from '../../../helpers/useIndex';
import calcPercent from '../../../helpers/formHelpers/calcPercent';
import HoldButton from '../../../Components/HoldButton';
import calcSliderIndex from '../../../helpers/formHelpers/calcSliderIndex.js';
import createEvent from '../../../helpers/createEvent';
import { useRef } from 'react';

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
  const slider = useRef({});

  useEffect(() => {
    onChange(createEvent(name, valueOptions[index].value));
  }, [index]);

  let prev = () => {
    setIndex((i) => i - 1);
  };

  let next = () => {
    setIndex((i) => i + 1);
  };

  let moveOnBackgroundClick = ({ clientX }) => {
    setIndex(calcSliderIndex(slider, clientX, length));
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div
      draggable="false"
      className="form-slider"
      style={{
        '--percent': calcPercent(index, length),
        '--display-tip': alwaysShowTip ? 'unset' : 'none',
      }}
    >
      <HoldButton name={name} className="form-slider-prev" action={prev}>
        -
      </HoldButton>

      <div
        ref={slider}
        className="form-slider-bg"
        onClick={moveOnBackgroundClick}
        draggable="false"
      >
        <input
          draggable="false"
          type="text"
          name={name}
          value={valueOptions[index].value}
          required={required}
          readOnly
        />

        <SliderThumb
          sliderRef={slider.current}
          sliderValuesCount={length}
          moveTo={setIndex}
          moveToStart={() => setIndex(0)}
          moveToEnd={() => setIndex(length - 1)}
        />
      </div>

      <HoldButton
        type="button"
        name={name}
        className="form-slider-next"
        action={next}
      >
        +
      </HoldButton>
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
