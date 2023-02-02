import { useMemo } from 'react';
import {
  ValueOptions,
  ValuesRange,
} from '../types/InputsProps/atomic/ValueOptions';

export function useValueOptionsRange(valuesRange: ValuesRange): ValueOptions {
  return useMemo(() => {
    if (!(valuesRange instanceof Array)) {
      let optionsArray: ValueOptions = [];
      let { from, to, step, labelCalculator } = valuesRange;
      step = step || 1;
      for (let i = from; i < to; i += step) {
        optionsArray.push({
          value: i.toString(),
          label: labelCalculator?.(i) ?? i.toString(),
        });
      }
      return optionsArray;
    }
    return valuesRange;
  }, [valuesRange]);
}
