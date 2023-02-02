import { useCallback, useMemo, useRef, useState } from 'react';
import { Optional } from '../helpers/Optional';
import { getSliderProgress } from '../helpers/getSliderProgress';
import { getSliderThumbStyles } from '../helpers/getSliderThumbStyles';
import { getSliderTrackStyles } from '../helpers/getSliderTrackStyles';
import { useOnSliderTrackClick } from '../hooks/useOnSliderTrackClick';
import { useValueOptionsRange } from '../hooks/useValueOptionsRange';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { ShowTip } from '../types/InputsProps/atomic/ShowTip';
import { ValueDisplayStyle } from '../types/InputsProps/atomic/ValueDisplayStyle';
import SliderThumb, { ThumbStyles } from './generic/SliderThumb';
import SliderTrack, { TrackStyles } from './generic/SliderTrack';

const SliderInput = ({
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
}: InputComponentProps<InputsProps, InputType.Slider>) => {
  const id = formId + name;

  let sliderInput = style?.hiddenSliderInput;
  let showTip = ShowTip.WhenActive;

  if (valueDisplayStyle === ValueDisplayStyle.AlwaysShowTip) {
    showTip = ShowTip.Always;
  }

  if (valueDisplayStyle === ValueDisplayStyle.ShowValue) {
    showTip = ShowTip.Never;
    sliderInput = style?.valueSliderInput;
  }

  const valueOptions = useValueOptionsRange(valuesRange);

  const sliderRef = useRef<HTMLDivElement>(null);

  const sliderProgress = getSliderProgress(valueOptions, value);

  const [sliderIndex, setSliderIndex] = useState(sliderProgress);
  const setSliderValue = useCallback(() => {
    setValue(name, valueOptions[sliderIndex]);
  }, [sliderIndex]);

  const onTrackClick = useOnSliderTrackClick(
    setSliderIndex,
    valueOptions.length,
    sliderRef,
  );
  const lastIndex = valueOptions.length - 1;
  const firstOption = valueOptions[0];
  const lastOption = valueOptions[lastIndex];
  const currentOption = valueOptions[sliderIndex];

  return (
    <div css={style?.root}>
      <Optional $={!!label}>
        <label htmlFor={id} css={style?.label}>
          {label}
        </label>
      </Optional>
      <div css={style?.trackRoot}>
        <input
          type="text"
          name={name}
          id={id}
          css={sliderInput}
          disabled={disabled}
          required={required}
          value={currentOption.label}
          onChange={() => {}}
        />
        <SliderTrack
          ref={sliderRef}
          rightPosition={sliderIndex / lastIndex}
          style={getSliderTrackStyles(style)}
          onTrackClick={onTrackClick}
          minLabel={firstOption.label ?? firstOption.value}
          maxLabel={lastOption.label ?? lastOption.value}
          showMinMax={valueDisplayStyle === ValueDisplayStyle.ShowMinMax}>
          <SliderThumb
            sliderRef={sliderRef}
            id={id}
            showTip={showTip}
            value={currentOption}
            style={getSliderThumbStyles(style)}
            valueIndex={sliderIndex}
            valuesCount={valueOptions.length}
            setNewIndex={setSliderIndex}
            setValue={setSliderValue}
            minIndex={0}
            maxIndex={lastIndex}
          />
        </SliderTrack>
      </div>
    </div>
  );
};

export default SliderInput;
