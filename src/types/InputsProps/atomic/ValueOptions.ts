export interface ValueOption {
  label?: string;
  value: string;
}

export type ValueOptions = ValueOption[];
export type OptionsRange = {
  from: number;
  to: number;
  step?: number;
  labelCalculator?: (item: number) => string;
};
export type ValuesRange = ValueOptions | OptionsRange;
