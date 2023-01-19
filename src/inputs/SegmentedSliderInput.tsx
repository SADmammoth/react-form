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
import SegmentedSliderTrack, {
  SegmentedSliderTrackStyles,
} from './generic/SegmentedSliderTrack';
import SliderThumb, { ThumbStyles } from './generic/SliderThumb';

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
}: InputComponentProps<InputsProps, InputType.SegmentedSlider>) => {
  const id = formId + name;

  let trackStyles: SegmentedSliderTrackStyles | undefined;
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
      resetButton,
    } = style;
    thumbStyles = { thumb, thumbTip, activeThumb, thumbDragArea };
    trackStyles = {
      label,
      trackContainer,
      thumbsContainer,
      resetButton,
    };
  }
  let sliderInput = style ? style.hiddenSliderInput : null;

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
      return optionsArray;
    }
    return valuesRange;
  }, [valuesRange]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderProgress = getSliderProgress(valueOptions, value);
  const [sliderIndex, setSliderIndex] = useState(value ? sliderProgress : null);
  const setSliderValue = useCallback(() => {
    if (sliderIndex !== null) setValue(name, valueOptions[sliderIndex]);
  }, [sliderIndex]);

  const segmentsCount = segmentsCountProp
    ? segmentsCountProp
    : valueOptions.length;

  const onTrackClick = useCallback(
    (event, i) => {
      const { left, width } = (
        event.target as HTMLButtonElement
      ).getBoundingClientRect();
      let index =
        ((event.clientX - left) / width) *
          (valueOptions.length / segmentsCount) +
        i * (valueOptions.length / segmentsCount);

      if (index < 0 || i === null) {
        setSliderIndex(null);
        setValue(name, undefined);
        return;
      }
      setSliderIndex(Math.floor(index));
      setValue(name, valueOptions[Math.floor(index)]);
    },
    [valueOptions, setSliderIndex, setSliderValue],
  );

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
          value={sliderIndex !== null ? valueOptions[sliderIndex].label : ''}
        />
        <SegmentedSliderTrack
          ref={sliderRef}
          leftPosition={
            sliderIndex !== null
              ? sliderIndex / (valueOptions.length - 1)
              : null
          }
          style={trackStyles}
          onTrackClick={onTrackClick}
          minLabel={valueOptions[0].label || valueOptions[0].value}
          maxLabel={
            valueOptions[valueOptions.length - 1].label ||
            valueOptions[valueOptions.length - 1].value
          }
          showMinMax={false}
          segment={segment}
          segmentsCount={segmentsCount}>
          <SliderThumb
            sliderRef={sliderRef}
            id={id}
            showTip={ShowTip.Never}
            value={
              sliderIndex !== null
                ? valueOptions[sliderIndex]
                : { value: '', label: '' }
            }
            style={thumbStyles}
            valueIndex={sliderIndex !== null ? sliderIndex : 0}
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
