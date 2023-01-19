import { css } from '@emotion/react';
import { SegmentedSliderInputStyles } from '../styles/SegmentedSliderInputStyles';
import { SliderInputStyles } from '../styles/SliderInputStyles';
import { ProcessedClasses } from '../styles/helpers/classes';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { CheckboxGroupInputStyles } from '../styles/CheckboxGroupInput.styles';
import { CheckboxInputStyles } from '../styles/CheckboxInput.styles';
import { NumberInputStyles } from '../styles/NumberInput.styles';
import { RadioGroupInputStyles } from '../styles/RadioGroupInput.styles';
import { TextInputStyles } from '../styles/TextInput.styles';

function _placeholderStyles() {
  return Object.fromEntries(
    Object.keys(InputType).map((type) => {
      return [type, css``];
    }),
  ) as unknown as { [type in InputType]: ProcessedClasses<any> };
}

const TYPES = {
  ..._placeholderStyles(),
  [InputType.Text]: TextInputStyles,
  [InputType.Number]: NumberInputStyles,
  [InputType.Checkbox]: CheckboxInputStyles,
  [InputType.CheckboxGroup]: CheckboxGroupInputStyles,
  [InputType.RadioGroup]: RadioGroupInputStyles,
  [InputType.Slider]: SliderInputStyles,
  [InputType.SegmentedSlider]: SegmentedSliderInputStyles,
};

export type StyleByType = typeof TYPES;

export function getStyleByType<Type extends InputType>(
  type: Type,
): StyleByType[Type] {
  return TYPES[type];
}
