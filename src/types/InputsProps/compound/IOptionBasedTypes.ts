import { ValueOption, ValueOptions } from '../atomic/ValueOptions';

export type OptionProps = {
  [optionValueSelector: string]: {
    disabled?: boolean;
    hidden?: boolean;
  };
};

export interface IOptionBasedTypes {
  valueOptions: ValueOptions;
  value?: ValueOption;
  optionsProps?: OptionProps;
}
