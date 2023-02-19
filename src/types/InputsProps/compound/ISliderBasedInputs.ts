import { ValueDisplayStyle } from '../atomic/ValueDisplayStyle';
import { IRangeBasedTypes } from './IRangeBasedTypes';

export interface ISliderBasedInputs extends IRangeBasedTypes {
  valueDisplayStyle?: ValueDisplayStyle;
}
