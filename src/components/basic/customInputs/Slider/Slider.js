/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import createEvent from '@/formHelpers/createEvent';
import calcPercent from '@/formHelpers/slider/calcPercent';
import calcSliderIndex from '@/formHelpers/slider/calcSliderIndex';
import HoldButton from '@/generic/HoldButton';
import SliderThumb from '@/generic/SliderThumb';
import compareObjects from '@/helpers/compareObjects';
import useIndex from '@/hooks/useIndex';
import theme from '@/styles/theme';

import styles from './Slider.styles';

const useStyles = createUseStyles(styles);

function Slider(props) {
  const {
    className,
    // type,
    name,
    value: currentValue,
    onChange,
    required,
    valueOptions,
    alwaysShowTip,
    disabled,
  } = props;

  const value = currentValue || valueOptions[0].value;
  let currentIndex = valueOptions.findIndex((el) => el.value === value);
  currentIndex = currentIndex < 0 ? 0 : currentIndex;
  const { length } = valueOptions;

  const [index, setIndex, prev, next] = useIndex(currentIndex, length);
  const slider = useRef({});

  useEffect(() => {
    onChange(createEvent(name, valueOptions[index].value));
  }, [index]);

  const moveOnBackgroundClick = ({ clientX }) => {
    if (!disabled) setIndex(calcSliderIndex(slider, clientX, length));
  };

  const classes = useStyles({ ...theme, position: calcPercent(index, length) });

  return (
    <div
      className={classNames(className, { [classes.disabled]: disabled })}
      draggable="false">
      <HoldButton
        name={name}
        className={classNames(classes.button, { [classes.disabled]: disabled })}
        action={prev}
        disabled={disabled}>
        -
      </HoldButton>

      <div
        ref={slider}
        className={classes.background}
        onClick={moveOnBackgroundClick}
        draggable="false">
        <SliderThumb
          type="slider"
          sliderRef={slider.current}
          sliderValuesCount={length}
          moveTo={setIndex}
          moveToStart={() => setIndex(0)}
          moveToEnd={() => setIndex(length - 1)}
          value={valueOptions[index].value}
          required={required}
          position={calcPercent(index, length)}
          showTip={alwaysShowTip}
          disabled={disabled}
        />
      </div>

      <HoldButton
        type="button"
        name={name}
        className={classNames(classes.button, { [classes.disabled]: disabled })}
        action={next}
        disabled={disabled}>
        +
      </HoldButton>
    </div>
  );
}

Slider.defaultProps = {
  className: '',
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
  className: PropTypes.string,
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
