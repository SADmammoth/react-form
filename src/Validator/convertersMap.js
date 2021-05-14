import DateMaskConverters from './DateMaskConverters';
import validatorsMap from './validatorsMap';

const convertersMap = {
  date: {
    in: (input) =>
      DateMaskConverters.fromDateToMask(
        input,
        validatorsMap.getFormats().dateFormat,
      ),
    out: (date) =>
      DateMaskConverters.parseDateByMask(
        date,
        validatorsMap.getFormats().dateFormat,
      ),
  },
  dateTime: {
    in: (input) =>
      DateMaskConverters.fromDateToMask(
        input,
        validatorsMap.getFormats().dateTimeFormat,
      ),
    out: (date) =>
      DateMaskConverters.parseDateByMask(
        date,
        validatorsMap.getFormats().dateTimeFormat,
      ),
  },
};

export default convertersMap;
