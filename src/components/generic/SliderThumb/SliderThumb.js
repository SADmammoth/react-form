/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import calcSliderPart from '@/helpers/calcSliderPart';
import theme from '@/styles/theme';
import styles from './SliderThumb.styles';

const useStyles = createUseStyles(styles);

function SliderThumb({
  name,
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
  disabled,
}) {
  const classes = useStyles({ ...theme, position });

  const [dragging, setDragging] = useState(false);
  // Saved dimensions and position on the screen of slider DOM-selement
  const [sliderRectParams, setSliderRectParams] = useState({});

  const [sliderStep, setSliderStep] = useState(0);

  useEffect(() => {
    setSliderStep(calcSliderPart(sliderRef, sliderValuesCount));
  }, [sliderRef, sliderValuesCount]);

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

        if (event.clientX > width + left) {
          moveToEnd();
          return;
        }

        const steps = Math.round((event.clientX - left) / sliderStep);

        if (steps) {
          moveTo(steps);
        }
      }
    },
    [dragging, sliderRectParams, sliderStep],
  );

  const endMove = () => {
    setDragging(false);
  };

  /**
   * Bind mousemove and mouseup listeners to document
   *
   * Mouse motion should be tracked all the time the user holds mouse button,
   * not only the time coursor is on slider thumb
   */

  let removeListeners = () => {}; // Saved removeListeners callback

  useEffect(() => {
    removeListeners();
    if (!disabled) {
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', endMove);
    }

    // Exact binded functions are would be removed.
    // They differ for each effect call
    removeListeners = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', endMove);
    };

    return removeListeners;
  }, [mouseMove, endMove]);

  return (
    <div
      draggable="false"
      className={classNames(classes[type], classes.thumb, {
        [classes.disabled]: disabled,
      })}
      onMouseDown={() => {
        if (sliderRef && sliderRectParams && sliderStep && !disabled) {
          setDragging(true);
        }
      }}>
      <input
        className={classNames(classes.tip, {
          [classes.alwaysShown]: !showTip,
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
