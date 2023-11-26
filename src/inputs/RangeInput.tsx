import { useCallback, useRef, useState } from 'react';
import { Optional } from '../helpers/Optional';
import { getSliderProgress } from '../helpers/getSliderProgress';
import { getSliderThumbStyles } from '../helpers/getSliderThumbStyles';
import { getSliderTrackStyles } from '../helpers/getSliderTrackStyles';
import { useValueOptionsRange } from '../hooks/useValueOptionsRange';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { ShowTip } from '../types/InputsProps/atomic/ShowTip';
import { ValueDisplayStyle } from '../types/InputsProps/atomic/ValueDisplayStyle';
import SliderThumb from './generic/SliderThumb';
import SliderTrack from './generic/SliderTrack';

const RangeInput = ({
  formId,
  name,
  label,
  setValue,
  style,
  value,
  valueOptions: valuesRange,
  disabled,
  required,
  valueDisplayStyle,
}: InputComponentProps<InputsProps, InputType.Range>) => {
  const id = formId + name;

  let sliderInput = style?.hiddenSliderInput;
  let showTip = ShowTip.WhenActive;

  // FIXME: Hide tooltip when ValueDisplayStyle.HideAll

  if (valueDisplayStyle === ValueDisplayStyle.AlwaysShowTip) {
    showTip = ShowTip.Always;
  }

  if (valueDisplayStyle === ValueDisplayStyle.ShowValue) {
    showTip = ShowTip.Never;
    sliderInput = style?.valueSliderInput;
  }

  const valueOptions = useValueOptionsRange(valuesRange);

  const sliderRef = useRef<HTMLDivElement>(null);

  const sliderLeftProgress = getSliderProgress(valueOptions, value?.from);
  const sliderRightProgress = getSliderProgress(
    valueOptions,
    value?.to,
    valueOptions.length - 1,
  );

  const [sliderLeftIndex, setSliderLeftIndex] = useState(sliderLeftProgress);
  const [sliderRightIndex, setSliderRightIndex] = useState(sliderRightProgress);

  const setSliderValue = useCallback(() => {
    setValue(name, {
      from: valueOptions[sliderLeftIndex],
      to: valueOptions[sliderRightIndex],
      range: valueOptions.slice(sliderLeftIndex, sliderRightIndex + 1),
    });
  }, [sliderLeftIndex, sliderRightIndex]);

  const lastIndex = valueOptions.length - 1;
  const firstOption = valueOptions[0];
  const lastOption = valueOptions[lastIndex];
  const currentLeftOption = valueOptions[sliderLeftIndex];
  const currentRightOption = valueOptions[sliderRightIndex];

  return (
    <div css={style?.root}>
      <Optional $={!!label}>
        <label htmlFor={id + '_from'} css={style?.label}>
          {/* FIXME: fix htmlFor*/}
          {label}
        </label>
      </Optional>
      <div css={style?.trackRoot}>
        <input
          type="text"
          name={name + '_from'}
          id={id + '_from'}
          css={sliderInput}
          disabled={disabled}
          required={required}
          value={currentLeftOption.label}
          onChange={() => {}}
        />
        <input
          type="text"
          name={name + '_to'}
          id={id + '_to'}
          css={sliderInput}
          disabled={disabled}
          required={required}
          value={currentRightOption.label}
          onChange={() => {}}
        />
        <SliderTrack
          ref={sliderRef}
          leftPosition={sliderLeftIndex / lastIndex}
          rightPosition={sliderRightIndex / lastIndex}
          style={getSliderTrackStyles(style)}
          minLabel={firstOption.label ?? firstOption.value}
          maxLabel={lastOption.label ?? lastOption.value}
          showMinMax={valueDisplayStyle === ValueDisplayStyle.ShowMinMax}>
          <SliderThumb
            sliderRef={sliderRef}
            id={id}
            position={sliderLeftIndex / lastIndex}
            showTip={showTip}
            value={currentLeftOption}
            style={getSliderThumbStyles(style)}
            valueIndex={sliderLeftIndex}
            valuesCount={valueOptions.length}
            setNewIndex={setSliderLeftIndex}
            setValue={setSliderValue}
            minIndex={0}
            maxIndex={sliderRightIndex}
          />
          <SliderThumb
            sliderRef={sliderRef}
            id={id}
            showTip={showTip}
            position={sliderRightIndex / lastIndex}
            value={currentRightOption}
            style={getSliderThumbStyles(style)}
            valueIndex={sliderRightIndex}
            valuesCount={valueOptions.length}
            setNewIndex={setSliderRightIndex}
            setValue={setSliderValue}
            minIndex={sliderLeftIndex}
            maxIndex={lastIndex}
          />
        </SliderTrack>
      </div>
    </div>
  );
};

export default RangeInput;
