import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function SliderThumb({ sliderPart, prev, next, onMoveEnd }) {
  let [dragging, setDragging] = useState(false);
  let [prevPos, setPrevPos] = useState(0);

  useEffect(() => {
    let endMove;
    let mouseMove;

    let removeListeners = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', endMove);
    };

    if (dragging) {
      endMove = () => {
        setDragging(false);
        onMoveEnd();
      };

      let update = (event) => {
        removeListeners(event);
        setPrevPos(event.clientX);
      };

      mouseMove = (event) => {
        if (event.clientX - prevPos <= -sliderPart) {
          update(event);
          prev();
          return;
        }
        if (event.clientX - prevPos >= sliderPart) {
          update(event);
          next();
          return;
        }
      };

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', endMove);
    }
    return removeListeners;
  }, [prevPos, dragging]);

  return (
    <div
      className="form-slider-thumb"
      onMouseDown={(event) => {
        setDragging(true);
        setPrevPos(event.clientX);
      }}
    ></div>
  );
}

SliderThumb.propTypes = {
  sliderPart: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  onMoveEnd: PropTypes.func.isRequired,
};

export default SliderThumb;
