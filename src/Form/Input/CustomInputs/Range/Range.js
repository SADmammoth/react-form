import React from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../../../helpers/compareObjects';
import SliderThumb from '../SliderThumb';
import calcPercent from '../../../../helpers/formHelpers/calcPercent';
import useRange from '../../../../helpers/useRange';
import useSliderPart from '../../../../helpers/formHelpers/useSliderPart';

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
  let length = valueOptions.length;

  if (!currentValue) {
    from = 0;
    to = valueOptions.length - 1;
  }

  let [leftIndex, rightIndex, setLeftIndex, setRightIndex] = useRange(
    from,
    to,
    length
  );

  let [range, part] = useSliderPart(length);

  let onChangeHandler = (leftIndex, rightIndex) => {
    if (rightIndex >= 0 && rightIndex <= length - 1 && leftIndex <= rightIndex)
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

  let onMoveEnd = () => {
    onChangeHandler(leftIndex, rightIndex);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div
      className="form-range"
      style={{
        '--start': calcPercent(leftIndex, length),
        '--percent': calcPercent(rightIndex, length),
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
            setLeftIndex(leftIndex - 1);
          }}
          next={() => {
            setLeftIndex(leftIndex + 1);
          }}
          onMoveEnd={onMoveEnd}
        />

        <SliderThumb
          sliderPart={part}
          prev={() => {
            setRightIndex(rightIndex - 1);
          }}
          next={() => {
            setRightIndex(rightIndex + 1);
          }}
          onMoveEnd={onMoveEnd}
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
  value: PropTypes.oneOfType([
    PropTypes.shape({
      from: PropTypes.number.isRequired,
      to: PropTypes.number.isRequired,
    }),
    PropTypes.string,
  ]),
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
