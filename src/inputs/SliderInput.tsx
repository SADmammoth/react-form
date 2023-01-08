import { useCallback, useRef, useState } from 'react';
import { getSliderProgress } from '../helpers/getSliderProgress';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import SliderThumb, { ThumbStyles } from './generic/SliderThumb';
import SliderTrack, { TrackStyles } from './generic/SliderTrack';

const SliderInput = ({
  formId,
  name,
  label,
  setValue,
  style,
  value,
  valueOptions,
  disabled,
  required,
}: InputComponentProps<InputsProps, InputType.Slider>) => {
  const id = formId + name;

  let trackStyles: TrackStyles | undefined;
  let thumbStyles: ThumbStyles | undefined;

  if (style) {
    const {
      thumb,
      thumbTip,
      activeThumb,
      label,
      trackContainer,
      thumbsContainer,
      thumbDragArea,
    } = style;
    thumbStyles = { thumb, thumbTip, activeThumb, thumbDragArea };
    trackStyles = { label, trackContainer, thumbsContainer };
  }

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderProgress = getSliderProgress(valueOptions, value);
  const [sliderIndex, setSliderIndex] = useState(sliderProgress);
  const setSliderValue = useCallback(() => {
    console.log(sliderIndex, valueOptions[sliderIndex]);
    setValue(name, valueOptions[sliderIndex]);
  }, [sliderIndex]);
  return (
    <div css={style ? style.root : style}>
      <input
        type="text"
        name={name}
        id={id}
        css={style ? style.sliderInput : style}
        disabled={disabled}
        required={required}
        value={value ? value.value : value}
      />
      <SliderTrack
        ref={sliderRef}
        id={id}
        label={label}
        leftPosition={sliderIndex / (valueOptions.length - 1)}
        style={trackStyles}>
        <SliderThumb
          sliderRef={sliderRef}
          id={id}
          showTip={true}
          value={valueOptions[sliderIndex]}
          style={thumbStyles}
          valueIndex={sliderIndex}
          valuesCount={valueOptions.length}
          setNewIndex={setSliderIndex}
          setValue={setSliderValue}
          minIndex={0}
          maxIndex={valueOptions.length - 1}
        />
      </SliderTrack>
    </div>
  );
};

export default SliderInput;
