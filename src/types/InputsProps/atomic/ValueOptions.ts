export interface ValueOption {
  label: string;
  value: string;
}

export type ValueOptions = ValueOption[] | { from: number; to: number }; //TODO
