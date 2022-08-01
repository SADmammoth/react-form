export type Validator = (value: any) => boolean;
export type Validators = { validator?: Validator; byCharValidator?: Validator };

export type ValidatorProps = Validator | string;
export type ByCharValidatorProps = Validator | string;
