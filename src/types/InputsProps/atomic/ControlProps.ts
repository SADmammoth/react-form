export interface ControlProps {
  map: { '*': unknown } & unknown[];
  prop: string;
  group: string;
  field: string;
} //TODO Replace with actual

export type Converters = {
  in: (value: any) => any;
  out: (value: any) => any;
};

export type ConvertersProps = Converters | string;
