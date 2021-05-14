import formatFormValues from '../../../helpers/formHelpers/formatFormValues';
import useResponseProcessor from '../useResponseProcessor';

export default function useOnSubmit(
  values,
  inputsProps,
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
        handler(formatFormValues(values, inputsProps))
          .then(onResponseReceived)
          .catch(onResponseError);
      }
    }
  };
}
