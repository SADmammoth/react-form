import useResponseProcessor from '../useResponseProcessor';

import formatFormValues from '../../../helpers/formHelpers/formatFormValues';

export default function useOnSubmit(
  values,
  inputsProps,
  validateForm,
  handler,
  notifications
) {
  const [onResponseReceived, onResponseError] = useResponseProcessor(
    notifications
  );

  return (event) => {
    if (handler === null) {
      event.preventDefault();
      return;
    }

    if (handler) {
      event.preventDefault();
    }

    if (validateForm()) {
      console.log(handler, values);
      if (handler) {
        handler(formatFormValues(values, inputsProps))
          .then(onResponseReceived)
          .catch(onResponseError);
      }
    }
  };
}
