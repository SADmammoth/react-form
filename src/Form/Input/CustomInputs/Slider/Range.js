import React, { useEffect, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../../../helpers/compareObjects';
import Slider from './Slider';
import SliderThumb from './SliderThumb';

function Range(props) {
  const {
    name,
    type,
    value: currentValue,
    onChange,
    required,
    valueOptions,
    alwaysShowTip,
  } = props;

  let { from, to } = currentValue;

  if (!currentValue) {
    from = 0;
    to = valueOptions.length - 1;
  }

  let calcPercent = (index) => (index / (valueOptions.length - 1)) * 100;

  let [leftIndex, setLeftIndex] = useState(from);
  let [rightIndex, setRightIndex] = useState(to);

  let range = useRef({});
  let [part, setPart] = useState(0);

  let onChangeHandler = (leftIndex, rightIndex) => {
    onChange({
      target: {
        name,
        value: {
          ...valueOptions.slice(leftIndex, rightIndex + 1),
          from: leftIndex,
          to: rightIndex,
        },
      },
    });
  };

  useEffect(() => {
    let width = range.current.getBoundingClientRect().width;

    setPart(width / valueOptions.length);
  }, [range, valueOptions]);

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div
      className="form-range"
      style={{
        '--start': calcPercent(leftIndex),
        '--percent': calcPercent(rightIndex),
        '--display-tip': alwaysShowTip ? 'unset' : 'none',
      }}
    >
      <div ref={range} className="form-range-bg">
        <input
          type="text"
          name={name + '-left'}
          value={valueOptions[leftIndex].value}
          required={required}
          readOnly
        ></input>
        <input
          type="text"
          name={name + '-right'}
          value={valueOptions[rightIndex].value}
          required={required}
          readOnly
        ></input>
        <SliderThumb
          sliderPart={part}
          prev={() => {
            if (leftIndex > 0) {
              setLeftIndex(leftIndex - 1);
            }
          }}
          next={() => {
            if (leftIndex < rightIndex - 1) {
              setLeftIndex(leftIndex + 1);
            }
          }}
          onMoveEnd={() => {
            onChangeHandler(leftIndex, rightIndex);
          }}
        />

        <SliderThumb
          sliderPart={part}
          prev={() => {
            if (rightIndex > leftIndex + 1) {
              setRightIndex(rightIndex - 1);
            }
          }}
          next={() => {
            if (rightIndex < valueOptions.length - 1) {
              setRightIndex(rightIndex + 1);
            }
          }}
          onMoveEnd={() => {
            onChangeHandler(leftIndex, rightIndex);
          }}
        />
      </div>
    </div>
  );
}

Range.defaultProps = {
  required: false,
  value: null,
  placeholder: null,
  attributes: {
    step: 1,
    min: 0,
    max: 999,
  },
};

Range.propTypes = {
  value: PropTypes.shape({
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
  }),
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

export default React.memo(Range, compareObjects);
