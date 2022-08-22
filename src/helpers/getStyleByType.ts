import { css } from '@emotion/react';
import { ProcessedClasses } from '../styles/helpers/classes';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { StylesByType } from '../types/StylesByType';
import { NumberInputStyles } from '../styles/NumberInput.styles';
import { TextInputStyles } from '../styles/TextInput.styles.';

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
};

export function getStyleByType<Type extends InputType>(
  type: InputType,
): StylesByType[Type] {
  return TYPES[type];
}
