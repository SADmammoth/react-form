import { css } from '@emotion/react';
import { InputType } from 'src/types/InputsProps/atomic/InputType';
import { StylesByType } from 'src/types/StylesByType';
import classes from './helpers/classes';

export const TextInputStyles: StylesByType[InputType.Text] = classes({
  root: css`
    border: red 2px solid;
  `,
});
