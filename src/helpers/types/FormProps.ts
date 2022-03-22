import { ReactElement } from 'react';
import FormHtmlProps from './FormHtmlProps';
import InputsProps from './InputsProps';

export interface FormData {
  [key: string]: string;
}

export interface InputsComponentsList {
  [key: string]: object | ReactElement;
  $list: ReactElement[];
}

export interface RenderElementsProp {
  Group: ReactElement;
  Label: ReactElement;
  Loader: (size: string | number, centered: boolean) => ReactElement;
  Input: ReactElement;
  Form: ReactElement;
}

export enum NotificationStatus {
  Success = 'success',
  Error = 'error',
}

export default interface FormProps extends FormHtmlProps {
  inputs: InputsProps;

  onSubmit?: ((data: FormData) => Promise<void>) | false;
  submitButton?: ReactElement;
  resetOnSubmit?: boolean;
  persistFormData?: boolean;

  onInputsUpdate?: (inputs: InputsComponentsList) => void;
  onValueChange?: (diff: { [key: string]: unknown }) => void;

  notify?: (status: NotificationStatus, error?: unknown) => void;
  showNotifications?: 'all' | 'errorsOnly' | 'hideAll';

  render?: RenderElementsProp;

  validationMaskDateFormat?: string; //FIXME Add type
  validationMaskDateTimeFormat?: string; //FIXME Add type
  dateFormatMask?: string; //FIXME Add type
  dateTimeFormatMask?: string; //FIXME Add type
}
