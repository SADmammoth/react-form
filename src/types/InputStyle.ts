import { SerializedStyles } from '@emotion/react';
import { InputsProps } from './InputsProps/InputsProps';
import { StylesByType } from './StylesByType';

export type InputStyle<Props extends InputsProps> = {
  [name in keyof Props]: StylesByType[Props[name]['type']];
};
