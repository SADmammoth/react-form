import { ReactElement } from 'react';
import FormHtmlProps from './FormHtmlProps';
import InputsProps from './InputsProps';
import {
  OnInputUpdateCallback,
  NotificationsVisibility,
  NotifyCallback,
  RenderElementsProp,
  OnSubmitCallback,
} from './basic';

export default interface FormProps extends FormHtmlProps {
  inputs: InputsProps;

  onSubmit?: OnSubmitCallback;
  submitButton?: ReactElement;
  resetOnSubmit?: boolean;
  persistFormData?: boolean;

  onInputsUpdate?: OnInputUpdateCallback;
  onValueChange?: (diff: { [key: string]: unknown }) => void;

  notify?: NotifyCallback;
  showNotifications?: NotificationsVisibility;

  render?: RenderElementsProp;

  validationMaskDateFormat?: string; //FIXME Add type
  validationMaskDateTimeFormat?: string; //FIXME Add type
  dateFormatMask?: string; //FIXME Add type
  dateTimeFormatMask?: string; //FIXME Add type
}
