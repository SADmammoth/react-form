import { useCallback, useMemo, useRef, useState } from 'react';
import { getSliderThumbStyles } from 'src/helpers/getSliderThumbStyles';
import { useOnSegmentedSliderTrackClick } from 'src/hooks/useOnSegmentedSliderTrackClick';
import { useValueOptionsRange } from 'src/hooks/useValueOptionsRange';
import { Optional } from '../helpers/Optional';
import { getSegmentedSliderTrackStyles } from '../helpers/getSegmentedSliderTrackStyles';
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

  const valueOptions = useValueOptionsRange(valuesRange);

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
          css={style?.hiddenSliderInput}
          disabled={disabled}
          required={required}
          value={currentOption.label}
        />
        <SegmentedSliderTrack
          ref={sliderRef}
          rightPosition={sliderIndex !== null ? sliderIndex / lastIndex : null}
          style={getSegmentedSliderTrackStyles(style)}
          onTrackClick={onTrackClick}
          segment={segment}
          segmentsCount={segmentsCount}>
          <SliderThumb
            sliderRef={sliderRef}
            id={id}
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
