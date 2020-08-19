import React, { useEffect, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../../../helpers/compareObjects';

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
  let calcPercent = (index) => (index / (valueOptions.length - 1)) * 100;

  let [dragging, setDragging] = useState(false);
  let slider = useRef({});
  let [prevPos, setPrevPos] = useState(0);
  let [index, setIndex] = useState(currentIndex);
  let [part, setPart] = useState(0);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  let onChangeHandler = (index) => {
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

  useEffect(() => {
    let width = slider.current.getBoundingClientRect().width;

    setPart(width / valueOptions.length);
  }, [slider, valueOptions]);

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
        onChangeHandler(index);
      };

      let update = (event) => {
        removeListeners(event);
        setPrevPos(event.clientX);
      };

      mouseMove = (event) => {
        if (event.clientX - prevPos <= -part && index > 0) {
          update(event);
          setIndex(index - 1);
          return;
        }
        if (
          event.clientX - prevPos >= part &&
          index < valueOptions.length - 1
        ) {
          update(event);
          setIndex(index + 1);
          return;
        }
      };

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', endMove);
    }
    return removeListeners;
  }, [index, dragging]);

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
        '--percent': calcPercent(index),
        '--display-tip': dragging || alwaysShowTip ? 'unset' : 'none',
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
        <div
          className="form-slider-thumb"
          onMouseDown={(event) => {
            setDragging(true);
            setPrevPos(event.clientX);
            // document.addEventListener('mousemove', mouseMove);
            // document.addEventListener('mouseup', endMove);
          }}
        ></div>
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
