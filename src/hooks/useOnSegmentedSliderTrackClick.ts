import { useCallback } from 'react';
import {
  ValueOption,
  ValueOptions,
} from 'src/types/InputsProps/atomic/ValueOptions';

export const useOnSegmentedSliderTrackClick = (
  name: string,
  valueOptions: ValueOptions,
  segmentsCount: number,
  setSliderIndex: (index: number | null) => void,
  setValue: (name: string, value?: ValueOption) => void,
) => {
  return useCallback(
    (event, i) => {
      const { left, width } = (
        event.target as HTMLButtonElement
      ).getBoundingClientRect();
      let index =
        ((event.clientX - left) / width) *
          (valueOptions.length / segmentsCount) +
        i * (valueOptions.length / segmentsCount);

      if (index < 0 || i === null) {
        setSliderIndex(null);
        setValue(name, undefined);
        return;
      }
      setSliderIndex(Math.floor(index));
      setValue(name, valueOptions[Math.floor(index)]);
    },
    [valueOptions, setSliderIndex, setValue],
  );
};
