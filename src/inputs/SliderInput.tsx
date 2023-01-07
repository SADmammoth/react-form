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
    const { thumb, thumbTip, label, trackContainer, thumbsContainer } = style;
    thumbStyles = { thumb, thumbTip };
    trackStyles = { label, trackContainer, thumbsContainer };
  }

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
      <SliderTrack id={id} label={label} leftPosition={0} style={trackStyles}>
        <SliderThumb
          id={id}
          showTip={true}
          value={value ? value : valueOptions[0]}
          style={thumbStyles}
        />
      </SliderTrack>
    </div>
  );
};

export default SliderInput;
