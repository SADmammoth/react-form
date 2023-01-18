import { useCallback, useMemo, useRef, useState } from 'react';
import { getSliderProgress } from '../helpers/getSliderProgress';
import { getSliderProgressOnTrackClick } from '../helpers/getSliderProgressOnTrackClick';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import {
  ValueOption,
  ValueOptions,
} from '../types/InputsProps/atomic/ValueOptions';
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

  const valueOptions = useMemo(() => {
    if (!(valuesRange instanceof Array)) {
      let optionsArray: ValueOptions = [];
      let { from, to, step, labelCalculator } = valuesRange;
      step = step || 1;
      for (let i = from; i < to; i += step) {
        optionsArray.push({
          value: i.toString(),
          label: labelCalculator ? labelCalculator(i) : i.toString(),
        });
      }
      console.log(optionsArray);
      return optionsArray;
    }
    return valuesRange;
  }, [valuesRange]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderProgress = getSliderProgress(valueOptions, value);
  const [sliderIndex, setSliderIndex] = useState(sliderProgress);
  const setSliderValue = useCallback(() => {
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
        style={trackStyles}
        onTrackClick={(event) => {
          setSliderIndex(
            Math.round(
              (valueOptions.length - 1) *
                getSliderProgressOnTrackClick(event, sliderRef),
            ),
          );
        }}>
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
