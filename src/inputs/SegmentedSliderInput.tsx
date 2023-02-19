import { useCallback, useRef, useState } from 'react';
import { Optional } from '../helpers/Optional';
import { getSegmentedSliderTrackStyles } from '../helpers/getSegmentedSliderTrackStyles';
import { getSliderProgress } from '../helpers/getSliderProgress';
import { getSliderThumbStyles } from '../helpers/getSliderThumbStyles';
import { useOnSegmentedSliderTrackClick } from '../hooks/useOnSegmentedSliderTrackClick';
import { useSegmentedTrackLabelCalculator } from '../hooks/useSegmentedTrackLabelCalculator';
import { useValueOptionsRange } from '../hooks/useValueOptionsRange';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { ShowTip } from '../types/InputsProps/atomic/ShowTip';
import { ValueDisplayStyle } from '../types/InputsProps/atomic/ValueDisplayStyle';
import SegmentedSliderTrack from './generic/SegmentedSliderTrack';
import SliderThumb from './generic/SliderThumb';

const SegmentedSliderInput = ({
  formId,
  name,
  label,
  setValue,
  style,
  value,
  valueOptions: valuesRange,
  disabled,
  required,
  segment,
  segmentsCount: segmentsCountProp,
  valueDisplayStyle,
}: InputComponentProps<InputsProps, InputType.SegmentedSlider>) => {
  const id = formId + name;

  const valueOptions = useValueOptionsRange(valuesRange);

  let sliderInput = style?.hiddenSliderInput;
  if (valueDisplayStyle === ValueDisplayStyle.ShowValue) {
    sliderInput = style?.valueSliderInput;
  }

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderProgress = getSliderProgress(valueOptions, value);
  const [sliderIndex, setSliderIndex] = useState(value ? sliderProgress : null);
  const setSliderValue = useCallback(() => {
    if (sliderIndex !== null) setValue(name, valueOptions[sliderIndex]);
  }, [sliderIndex]);

  const segmentsCount = segmentsCountProp
    ? segmentsCountProp
    : valueOptions.length;

  const onTrackClick = useOnSegmentedSliderTrackClick(
    name,
    valueOptions,
    segmentsCount,
    setSliderIndex,
    setValue,
  );

  const lastIndex = valueOptions.length - 1;
  const currentOption =
    sliderIndex !== null ? valueOptions[sliderIndex] : { value: '', label: '' };
  const firstOption = valueOptions[0];
  const lastOption = valueOptions[lastIndex];

  const labelCalculator = useSegmentedTrackLabelCalculator(valuesRange);

  return (
    <div css={style ? style.root : style}>
      <Optional $={!!label}>
        <label htmlFor={id} css={style ? style.label : style}>
          {label}
        </label>
      </Optional>
      <div css={style ? style.trackRoot : style}>
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
        <SegmentedSliderTrack
          id={id}
          ref={sliderRef}
          rightPosition={sliderIndex !== null ? sliderIndex / lastIndex : null}
          style={getSegmentedSliderTrackStyles(style)}
          onTrackClick={onTrackClick}
          segment={segment}
          segmentsCount={segmentsCount}
          labelCalculator={labelCalculator}
          minLabel={firstOption.label ?? firstOption.value}
          maxLabel={lastOption.label ?? lastOption.value}
          showMinMax={valueDisplayStyle === ValueDisplayStyle.ShowMinMax}>
          <SliderThumb
            sliderRef={sliderRef}
            id={id}
            position={sliderProgress}
            showTip={ShowTip.Never}
            value={currentOption}
            style={getSliderThumbStyles(style)}
            valueIndex={sliderIndex ?? 0}
            valuesCount={valueOptions.length}
            setNewIndex={setSliderIndex}
            setValue={setSliderValue}
            minIndex={0}
            maxIndex={valueOptions.length - 1}
          />
        </SegmentedSliderTrack>
      </div>
    </div>
  );
};

export default SegmentedSliderInput;
