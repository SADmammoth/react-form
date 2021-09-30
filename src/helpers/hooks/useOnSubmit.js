import formatFormValues from '@/formHelpers/output/formatFormValues';
import useResponseProcessor from './useResponseProcessor';

export default function useOnSubmit(
  values,
  inputs,
  validateForm,
  handler,
  notifications,
  resetOnSubmit,
) {
  const [onResponseReceived, onResponseError] =
    useResponseProcessor(notifications);

  return (event) => {
    if (resetOnSubmit) {
      event.target.reset();
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
