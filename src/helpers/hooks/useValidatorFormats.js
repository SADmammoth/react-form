import { useEffect } from 'react';

import validatorsMap from '../../Validator/validatorsMap';

export default function useValidatorFormats({
  validationMaskDateFormat,
  validationMaskDateTimeFormat,
  dateFormatMask,
  dateTimeFormatMask,
}) {
  useEffect(() => {
    validatorsMap.setFormats(
      validationMaskDateFormat,
      validationMaskDateTimeFormat,
      dateFormatMask,
      dateTimeFormatMask,
    );
  }, [
    validationMaskDateFormat,
    validationMaskDateTimeFormat,
    dateFormatMask,
    dateTimeFormatMask,
  ]);
}
