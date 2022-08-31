import { css } from '@emotion/react';
import { ProcessedClasses } from '../styles/helpers/classes';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { StylesByType } from '../types/StylesByType';
import { CheckboxInputStyles } from '../styles/CheckboxStyles.styles';
import { NumberInputStyles } from '../styles/NumberInput.styles';
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
};

export type StyleByType = typeof TYPES;

export function getStyleByType<Type extends InputType>(
  type: Type,
): StyleByType[Type] {
  return TYPES[type];
}
