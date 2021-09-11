import React, { useCallback, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import createEvent from '@/formHelpers/createEvent';
import calcPercent from '@/formHelpers/slider/calcPercent';
import SliderThumb from '@/generic/SliderThumb';
import compareObjects from '@/helpers/compareObjects';
import useRange from '@/hooks/useRange';
import theme from '@/styles/theme';

import styles from './Range.styles';

const useStyles = createUseStyles(styles);

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

  const classes = useStyles({
    ...theme,
    from: calcPercent(leftIndex, length),
    to: calcPercent(rightIndex, length),
  });

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
    <div className="form-range">
      <div ref={range} className={classes.background}>
        <SliderThumb
          type="left"
          sliderRef={range.current}
          sliderValuesCount={length}
          moveTo={setLeftIndex}
          moveToStart={() => setLeftIndex(0)}
          moveToEnd={moveEndLeft}
          value={valueOptions[leftIndex].value}
          required={required}
          position={calcPercent(leftIndex, length)}
          showTip={alwaysShowTip}
        />

        <SliderThumb
          type="right"
          className={classes.right}
          sliderRef={range.current}
          sliderValuesCount={length}
          moveTo={setRightIndex}
          moveToStart={moveStartRight}
          moveToEnd={() => setRightIndex(length - 1)}
          value={valueOptions[rightIndex].value}
          required={required}
          position={calcPercent(rightIndex, length)}
          showTip={alwaysShowTip}
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