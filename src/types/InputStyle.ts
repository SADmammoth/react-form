import { SerializedStyles } from '@emotion/react';
import { StyleByType } from '../helpers/getStyleByType';
import { InputsProps } from './InputsProps/InputsProps';
import { InputType } from './InputsProps/atomic/InputType';

export type InputStyle<Props extends InputsProps> = {
  [name in keyof Props]: StyleByType[Props[name]['type']];
};
