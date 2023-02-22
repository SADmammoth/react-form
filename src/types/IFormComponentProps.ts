import { FormHTMLAttributes } from 'react';

export interface IFormComponentProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}
