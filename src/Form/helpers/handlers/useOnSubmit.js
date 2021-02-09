import useResponseProcessor from '../useResponseProcessor';

import formatFormValues from '../../../helpers/formHelpers/formatFormValues';

export default function useOnSubmit(
  values,
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
      if (handler) {
        handler(formatFormValues(values))
          .then(onResponseReceived)
          .catch(onResponseError);
      }
    }
  };
}
