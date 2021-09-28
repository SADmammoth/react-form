import useResponseProcessor from '../useResponseProcessor';
import formatFormValues from '@/formHelpers/output/formatFormValues';

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
