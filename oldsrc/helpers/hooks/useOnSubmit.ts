import { FormEvent, FormEventHandler } from 'react';
import formatFormValues from '@/outputHelpers/formatFormValues';
import {
  InputsState,
  OnSubmitCallback,
  UseNotificationsResult,
  ValuesState,
} from '../types/basic';
import useResponseProcessor from './useResponseProcessor';

export default function useOnSubmit(
  values: ValuesState,
  inputs: InputsState,
  validateForm: () => boolean,
  handler: OnSubmitCallback,
  notifications: UseNotificationsResult,
  resetOnSubmit: boolean,
): FormEventHandler {
  const [onResponseReceived, onResponseError] =
    useResponseProcessor(notifications);

  return (event: FormEvent) => {
    const form = event.target as HTMLFormElement;

    if (resetOnSubmit) {
      form.reset();
    }

    if (handler === null) {
      event.preventDefault();
      return;
    }

    if (handler) {
      event.preventDefault();
    }

    if (validateForm()) {
      if (handler) {
        handler(formatFormValues(values, inputs))
          .then(onResponseReceived)
          .catch(onResponseError);
      }
    }
  };
}
