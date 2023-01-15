export interface ValueOption {
  label?: string;
  value: string;
}

export type ValueOptions = ValueOption[];
export type ValuesRange =
  | ValueOptions
  | {
      from: number;
      to: number;
      step?: number;
      labelCalculator?: (item: number) => string;
    };
