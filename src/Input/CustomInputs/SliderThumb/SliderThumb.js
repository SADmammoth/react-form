import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import calcSliderPart from '../../../helpers/formHelpers/calcSliderPart';

function SliderThumb({
  sliderRef,
  sliderValuesCount,
  moveTo,
  moveToStart,
  moveToEnd,
}) {
  const [dragging, setDragging] = useState(false);
  const [sliderRectParams, setSliderRectParams] = useState({});
  const sliderPartLength = calcSliderPart(sliderRef, sliderValuesCount);

  useEffect(() => {
    if (!_.isEmpty(sliderRef)) {
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
    [dragging, JSON.stringify(sliderRectParams), sliderPartLength]
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
      draggable='false'
      className='form-slider-thumb'
      onMouseDown={() => {
        setDragging(true);
      }}
    ></div>
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
