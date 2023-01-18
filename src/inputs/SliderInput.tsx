import { useCallback, useMemo, useRef, useState } from 'react';
import { Optional } from '../helpers/Optional';
import { getSliderProgress } from '../helpers/getSliderProgress';
import { getSliderProgressOnTrackClick } from '../helpers/getSliderProgressOnTrackClick';
import { InputComponentProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { ShowTip } from '../types/InputsProps/atomic/ShowTip';
import { ValueDisplayStyle } from '../types/InputsProps/atomic/ValueDisplayStyle';
import { ValueOptions } from '../types/InputsProps/atomic/ValueOptions';
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
      minLabel,
      maxLabel,
      minMaxContainer,
    } = style;
    thumbStyles = { thumb, thumbTip, activeThumb, thumbDragArea };
    trackStyles = {
      minMaxContainer,
      label,
      trackContainer,
      thumbsContainer,
      minLabel,
      maxLabel,
    };
  }
  let sliderInput = style ? style.hiddenSliderInput : null;

  let showTip = ShowTip.WhenActive;

  if (valueDisplayStyle === ValueDisplayStyle.AlwaysShowTip) {
    showTip = ShowTip.Always;
  }

  if (valueDisplayStyle === ValueDisplayStyle.ShowValue) {
    showTip = ShowTip.Never;
    sliderInput = style ? style.valueSliderInput : null;
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
          value={valueOptions[sliderIndex].label}
        />
        <SliderTrack
          ref={sliderRef}
          leftPosition={sliderIndex / (valueOptions.length - 1)}
          style={trackStyles}
          onTrackClick={(event) => {
            setSliderIndex(
              Math.round(
                (valueOptions.length - 1) *
                  getSliderProgressOnTrackClick(event, sliderRef),
              ),
            );
          }}
          minLabel={valueOptions[0].label || valueOptions[0].value}
          maxLabel={
            valueOptions[valueOptions.length - 1].label ||
            valueOptions[valueOptions.length - 1].value
          }
          showMinMax={valueDisplayStyle === ValueDisplayStyle.ShowMinMax}>
          <SliderThumb
            sliderRef={sliderRef}
            id={id}
            showTip={showTip}
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
    </div>
  );
};

export default SliderInput;
