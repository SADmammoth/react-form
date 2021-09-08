/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useCallback } from 'react';

import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import calcSliderPart from '@/formHelpers/slider/calcSliderPart';
import theme from '@/styles/theme';

import styles from './SliderThumb.styles';

const useStyles = createUseStyles(styles);

function SliderThumb({
  type,
  sliderRef,
  sliderValuesCount,
  moveTo,
  moveToStart,
  moveToEnd,
  value,
  position,
  required,
  showTip,
}) {
  const classes = useStyles({ ...theme, position });

  const [dragging, setDragging] = useState(false);
  const [sliderRectParams, setSliderRectParams] = useState({});
  const sliderPartLength = calcSliderPart(sliderRef, sliderValuesCount);

  useEffect(() => {
    if (!isEmpty(sliderRef)) {
      setSliderRectParams(sliderRef.getBoundingClientRect());
    }
  }, [sliderRef]);

  const mouseMove = useCallback(
    (event) => {
      if (dragging) {
        const { left, width } = sliderRectParams;

        if (event.clientX < left) {
          moveToStart();
          return;
        }

        if (event.clientX - left > width) {
          moveToEnd();
          return;
        }

        const steps = Math.round((event.clientX - left) / sliderPartLength);

        if (steps) {
          moveTo(steps);
        }
      }
    },
    [dragging, JSON.stringify(sliderRectParams), sliderPartLength],
  );

  const endMove = () => setDragging(false);

  useEffect(() => {
    function removeListeners() {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', endMove);
    }

    removeListeners();

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', endMove);

    return removeListeners;
  }, [mouseMove, endMove]);

  return (
    <div
      draggable="false"
      className={classNames(classes[type], classes.thumb)}
      onMouseDown={() => {
        setDragging(true);
      }}>
      <input
        className={classNames(classes.tip, {
          [classes.always]: showTip,
        })}
        type="text"
        name={`${name}-${type}`}
        value={value}
        required={required}
        readOnly
      />
    </div>
  );
}

SliderThumb.propTypes = {
  sliderRef: PropTypes.object.isRequired,
  moveTo: PropTypes.func.isRequired,
  moveToStart: PropTypes.func.isRequired,
  moveToEnd: PropTypes.func.isRequired,
  sliderValuesCount: PropTypes.number.isRequired,
};

export default SliderThumb;
