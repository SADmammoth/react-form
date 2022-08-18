import { SerializedStyles } from '@emotion/react';
import { InputsProps } from './InputsProps/InputsProps';

export type InputStyle<Props extends InputsProps> = {
  [name in keyof Props]: SerializedStyles;
};
