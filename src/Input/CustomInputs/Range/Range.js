import React, { useCallback, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import compareObjects from '../../../helpers/compareObjects';
import createEvent from '../../../helpers/createEvent';
import calcPercent from '../../../helpers/formHelpers/calcPercent';
import useRange from '../../../helpers/useRange';
import SliderThumb from '../SliderThumb';

function Range(props) {
  const {
    // type,
    name,
    value: currentValue,
    onChange,
    required,
    valueOptions,
    alwaysShowTip,
  } = props;

  let { from, to } = currentValue;
  const { length } = valueOptions;

  const range = useRef({});

  if (!currentValue) {
    from = 0;
    to = valueOptions.length - 1;
  }

  const [leftIndex, rightIndex, setLeftIndex, setRightIndex] = useRange(
    from,
    to,
    length,
  );

  useEffect(() => {
    setLeftIndex(from);
    setRightIndex(to);
  }, [from, to]);

  useEffect(() => {
    onChange(
      createEvent(name, {
        ...valueOptions.slice(leftIndex, rightIndex + 1),
        from: leftIndex,
        to: rightIndex,
      }),
    );
  }, [leftIndex, rightIndex]);

  const moveEndLeft = useCallback(() => {
    setLeftIndex(rightIndex);
  }, [rightIndex]);

  const moveStartRight = useCallback(() => {
    setRightIndex(leftIndex);
  }, [leftIndex]);

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div
      className="form-range"
      style={{
        '--start': calcPercent(leftIndex, length),
        '--percent': calcPercent(rightIndex, length),
        '--display-tip': alwaysShowTip ? 'unset' : 'none',
      }}>
      <div ref={range} className="form-range-bg">
        <input
          type="text"
          name={`${name}-left`}
          value={valueOptions[leftIndex].value}
          required={required}
          readOnly
        />
        <input
          type="text"
          name={`${name}-right`}
          value={valueOptions[rightIndex].value}
          required={required}
          readOnly
        />

        <SliderThumb
          sliderRef={range.current}
          sliderValuesCount={length}
          moveTo={setLeftIndex}
          moveToStart={() => setLeftIndex(0)}
          moveToEnd={moveEndLeft}
        />

        <SliderThumb
          sliderRef={range.current}
          sliderValuesCount={length}
          moveTo={setRightIndex}
          moveToStart={moveStartRight}
          moveToEnd={() => setRightIndex(length - 1)}
        />
      </div>
    </div>
  );
}

Range.defaultProps = {
  required: false,
  value: null,
  // placeholder: null,
  // attributes: {
  //   step: 1,
  //   min: 0,
  //   max: 999,
  // },
};

Range.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.shape({
      from: PropTypes.number.isRequired,
      to: PropTypes.number.isRequired,
    }),
    PropTypes.string,
  ]),
  // placeholder: PropTypes.string,
  // attributes: PropTypes.object,
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

export default React.memo(Range, compareObjects);
