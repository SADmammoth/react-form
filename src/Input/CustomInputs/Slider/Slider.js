/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import HoldButton from '../../../Components/HoldButton';
import compareObjects from '../../../helpers/compareObjects';
import createEvent from '../../../helpers/createEvent';
import calcPercent from '../../../helpers/formHelpers/calcPercent';
import calcSliderIndex from '../../../helpers/formHelpers/calcSliderIndex';
import useIndex from '../../../helpers/useIndex';
import SliderThumb from '../SliderThumb';

function Slider(props) {
  const {
    // type,
    name,
    value: currentValue,
    onChange,
    required,
    valueOptions,
    alwaysShowTip,
  } = props;

  const value = currentValue || valueOptions[0].value;

  let currentIndex = valueOptions.findIndex((el) => el.value === value);
  currentIndex = currentIndex < 0 ? 0 : currentIndex;

  const { length } = valueOptions;

  const [index, setIndex] = useIndex(currentIndex, length);
  const slider = useRef({});

  useEffect(() => {
    onChange(createEvent(name, valueOptions[index].value));
  }, [index]);

  const prev = () => {
    setIndex((i) => i - 1);
  };

  const next = () => {
    setIndex((i) => i + 1);
  };

  const moveOnBackgroundClick = ({ clientX }) => {
    setIndex(calcSliderIndex(slider, clientX, length));
  };

  return (
    <div
      draggable="false"
      className="form-slider"
      style={{
        '--percent': calcPercent(index, length),
        '--display-tip': alwaysShowTip ? 'unset' : 'none',
      }}>
      <HoldButton name={name} className="form-slider-prev" action={prev}>
        -
      </HoldButton>

      <div
        ref={slider}
        className="form-slider-bg"
        onClick={moveOnBackgroundClick}
        draggable="false">
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
        action={next}>
        +
      </HoldButton>
    </div>
  );
}

Slider.defaultProps = {
  required: false,
  value: null,
  // placeholder: null,
  // attributes: {
  //   step: 1,
  //   min: 0,
  //   max: 999,
  // },
};

Slider.propTypes = {
  value: PropTypes.string,
  // placeholder: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  valueOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  ]).isRequired,
  alwaysShowTip: PropTypes.bool,
};

export default React.memo(Slider, compareObjects);
