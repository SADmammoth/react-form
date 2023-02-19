import { useCallback } from 'react';
import { ValuesRange } from '../types/InputsProps/atomic/ValueOptions';

export function useSegmentedTrackLabelCalculator(valuesRange: ValuesRange) {
  return useCallback(
    (index: number) => {
      if (valuesRange instanceof Array) {
        return valuesRange[index].label ?? '';
      }

      const value = (valuesRange?.step ?? 1) * index + valuesRange.from;
      return valuesRange.labelCalculator?.(value) ?? value.toString() ?? '';
    },
    [valuesRange],
  );
}
