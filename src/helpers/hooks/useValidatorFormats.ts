import { useEffect } from 'react';
//@ts-ignore
import validatorsMap from '@/Validator/validatorsMap';

export default function useValidatorFormats(params: {
  validationMaskDateFormat: string; //TODO Replace with actual types,
  validationMaskDateTimeFormat: string; //TODO Replace with actual types,
  dateFormatMask: string; //TODO Replace with actual types,
  dateTimeFormatMask: string; //TODO Replace with actual types,
}) {
  const {
    validationMaskDateFormat,
    validationMaskDateTimeFormat,
    dateFormatMask,
    dateTimeFormatMask,
  } = params;

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
