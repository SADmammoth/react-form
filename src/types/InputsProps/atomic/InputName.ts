declare const inputNameSymbol: unique symbol;
export type InputName = string & { [inputNameSymbol]: never };
