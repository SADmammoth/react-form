import { Interpolation, Theme } from '@emotion/react';
import { Classes, ProcessedClasses } from '../styles/helpers/classes';
import { InputType } from './InputsProps/atomic/InputType';

export type StylesByType = {
  [key in InputType]: ProcessedClasses<{
    root: Interpolation<Theme>;
  }>;
} & { [type in InputType]: ProcessedClasses<Classes> };
