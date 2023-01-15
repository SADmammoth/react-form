import { ValueOption, ValuesRange } from '../atomic/ValueOptions';
import { IOptionBasedTypes } from './IOptionBasedTypes';

export interface IRangeBasedTypes
  extends Omit<IOptionBasedTypes, 'valueOptions'> {
  valueOptions: ValuesRange;
}
